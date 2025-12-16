import { useState, useEffect } from 'react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import formStyles from '../components/FormInput.module.css';
import '../styles/pages/Contact.css';

// Load config from Vite environment variables (set in .env).
// Note: anything in import.meta.env is bundled into the frontend and visible to users.
// Keep truly secret values (recaptcha secret, EmailJS server keys) on a backend.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [recaptchaWidgetId, setRecaptchaWidgetId] = useState<number | null>(null);

  // load reCAPTCHA v2 widget script and render a visible checkbox under the form
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    const id = `recaptcha-script`;
    if (document.getElementById(id)) {
      // If script already present, wait for grecaptcha.render to exist then render
      let tries = 0;
      const waiter = setInterval(() => {
        if ((window as any).grecaptcha && typeof (window as any).grecaptcha.render === 'function') {
          clearInterval(waiter);
          const wid = (window as any).grecaptcha.render('recaptcha-container', { sitekey: RECAPTCHA_SITE_KEY });
          setRecaptchaWidgetId(wid);
          setRecaptchaReady(true);
        }
        if (++tries > 50) clearInterval(waiter);
      }, 100);
      return;
    }
    const s = document.createElement('script');
    s.id = id;
    // load the v2 explicit API (no render param) so grecaptcha.render is available
    s.src = `https://www.google.com/recaptcha/api.js`;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);

    // poll for grecaptcha.render to become available, then render the widget
    let tries = 0;
    const waiter = setInterval(() => {
      if ((window as any).grecaptcha && typeof (window as any).grecaptcha.render === 'function' && document.getElementById('recaptcha-container')) {
        clearInterval(waiter);
        const wid = (window as any).grecaptcha.render('recaptcha-container', { sitekey: RECAPTCHA_SITE_KEY });
        setRecaptchaWidgetId(wid);
        setRecaptchaReady(true);
      }
      if (++tries > 80) clearInterval(waiter);
    }, 100);

    return () => {
      clearInterval(waiter);
    };
  }, []);

  const handleSend = async () => {
    setStatus('');
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // basic email format check
    const isValidEmail = (e: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(e);
    };

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setStatus('Please fill all fields.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setStatus('Please enter a valid email address so we can reply.');
      return;
    }
    // Rate limiting: simple client-side protections using localStorage
    try {
      const key = 'contact:sentTimes';
      const now = Date.now();
      const raw = localStorage.getItem(key);
      const times: number[] = raw ? JSON.parse(raw) : [];
      // keep only entries within last hour
      const hourAgo = now - 1000 * 60 * 60;
      const recent = times.filter((t) => t > hourAgo);
      const last = recent[recent.length - 1] ?? 0;
      const secondsSinceLast = Math.floor((now - last) / 1000);
      const COOLDOWN_SECONDS = 60; // minimum seconds between sends
      const MAX_PER_HOUR = 5; // maximum sends per hour
      if (secondsSinceLast < COOLDOWN_SECONDS) {
        setStatus(`Please wait ${COOLDOWN_SECONDS - secondsSinceLast}s before sending another message.`);
        return;
      }
      if (recent.length >= MAX_PER_HOUR) {
        setStatus('You have reached the maximum number of messages allowed per hour. Try again later.');
        return;
      }
      // record attempt now (will be persisted on success)
      recent.push(now);
      localStorage.setItem(key, JSON.stringify(recent));
    } catch (err) {
      // if localStorage unavailable, continue but warn in console
      console.warn('localStorage not available for rate limiting', err);
    }
    setSending(true);
    try {
      // get recaptcha token from rendered v2 widget
      let recaptchaToken = '';
      if (RECAPTCHA_SITE_KEY && (window as any).grecaptcha && recaptchaWidgetId !== null) {
        try {
          recaptchaToken = (window as any).grecaptcha.getResponse(recaptchaWidgetId);
          if (!recaptchaToken) {
            setStatus('Please complete the reCAPTCHA challenge.');
            setSending(false);
            return;
          }
        } catch (rcErr) {
          console.warn('reCAPTCHA getResponse failed', rcErr);
        }
      }

      const payload = {
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          // keep friendly names for local use, and include EmailJS expected fields
          name: trimmedName,
          email: trimmedEmail,
          from_name: trimmedName,
          from_email: trimmedEmail,
          message: trimmedMessage,
          // include recaptcha token for server-side verification
          recaptchaToken,
        },
      };

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'EmailJS error');
      }

      setStatus('Message sent — thanks!');
      setName('');
      setEmail('');
      setMessage('');
      // reset recaptcha widget after successful send
      try {
        if ((window as any).grecaptcha && recaptchaWidgetId !== null) (window as any).grecaptcha.reset(recaptchaWidgetId);
      } catch {}
    } catch (err: any) {
      console.error(err);
      setStatus('Could not send message. Check your EmailJS settings.');
      // on failure, remove the last recorded attempt so user isn't penalized
      try {
        const key = 'contact:sentTimes';
        const raw = localStorage.getItem(key);
        const times: number[] = raw ? JSON.parse(raw) : [];
        times.pop();
        localStorage.setItem(key, JSON.stringify(times));
      } catch {}
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="page contact-page">
      <h1>Contact & Report</h1>
      <p>Questions, partnership ideas, or safety reports? Reach out and our moderators will respond quickly.</p>
      <div className="contact-form">
        <FormInput label="Name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <FormInput label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" inputMode="email" autoComplete="email" />
        <label className={formStyles.field}>
          <span className={formStyles.label}>Message</span>
          <textarea className={formStyles.input} placeholder="What do you want to share?" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        {/* reCAPTCHA widget container (visible checkbox) */}
        <div id="recaptcha-container" style={{ margin: '12px 0' }} />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="secondary" type="button" onClick={handleSend} disabled={sending}>{sending ? 'Sending…' : 'Send'}</Button>
          {status && <p className="form-status">{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default Contact;
