import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { createCache, recordCacheCreation } from '../utils/firestore';
import { auth } from '../utils/firebase';
import '../styles/pages/CreateCache.css';

const initialForm = {
  title: '',
  location: '',
  category: '',
  rewardSummary: '',
  safety: '',
  education: '',
  coordinates: '',
};

function CreateCache() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const navigate = useNavigate();

  const update = (key: keyof typeof initialForm, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.title || !form.location) {
      setStatus('Please add a title and location to publish a cache.');
      return;
    }
    try {
      const [lat, lng] = form.coordinates.split(',').map((value) => Number(value.trim()));
      const newId = await createCache({
        title: form.title,
        location: form.location,
        category: form.category || 'General',
        rewardSummary: form.rewardSummary || 'Surprise reward revealed on check-in.',
        description: form.education || 'A surprise robotics drop—no tasks required, rewards unlock when you arrive.',
        hint: form.safety || 'See onsite safety note',
        education: form.education || 'Share a robotics learning takeaway without spoilers.',
        coordinates: { lat: lat || 0, lng: lng || 0 },
        taskFree: true,
      });
      // if user is signed in, record this creation on their user stats
      if (auth.currentUser) {
        try {
          await recordCacheCreation(auth.currentUser.uid, newId);
        } catch (err) {
          // non-fatal: still create cache even if user stats update fails
          console.warn('Could not update user created count', err);
        }
      }
      setStatus('Cache saved to Google Cloud Firestore.');
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus('Could not save to Firestore. Check your Google credentials and retry.');
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    // if there's no current user immediately, show the popup and schedule redirect
    if (!auth.currentUser) {
      setShowAuthPopup(true);
      timer = setTimeout(() => {
        navigate('/auth', { replace: true });
      }, 1600);
    }

    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      if (!current && !timer) {
        setShowAuthPopup(true);
        timer = setTimeout(() => {
          navigate('/auth', { replace: true });
        }, 1600);
      }
    });

    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="page create-cache-page">
      <header className="page-header">
        <p className="eyebrow">Create</p>
        <h1>Publish a robotics cache</h1>
        <p className="lede">Share a surprise robotics reward with coordinates, safety notes, and an educational takeaway—no tasks or spoilers.</p>
      </header>

      <form className="cache-form" onSubmit={handleSubmit}>
        <FormInput label="Title" value={form.title} onChange={(e) => update('title', e.target.value)} />
        <FormInput label="Location" value={form.location} onChange={(e) => update('location', e.target.value)} />
        <FormInput label="Coordinates" placeholder="40.7128,-74.0060" value={form.coordinates} onChange={(e) => update('coordinates', e.target.value)} />
        <FormInput label="Category" placeholder="Electronics, mechanical, programming" value={form.category} onChange={(e) => update('category', e.target.value)} />
        <FormInput label="Reward hint (no spoilers)" placeholder="Mystery reward revealed on check-in" value={form.rewardSummary} onChange={(e) => update('rewardSummary', e.target.value)} />
        <FormInput label="Safety note" value={form.safety} onChange={(e) => update('safety', e.target.value)} />
        <FormInput label="Educational note" value={form.education} onChange={(e) => update('education', e.target.value)} />
        <div className="form-actions">
          <Button type="submit" variant="secondary">Save draft</Button>
          <Button type="button" variant="ghost" onClick={() => setForm(initialForm)}>Clear</Button>
        </div>
        {status && <p className="form-status">{status}</p>}
      </form>
      {showAuthPopup && (
        <div style={{ position: 'fixed', left: 0, right: 0, top: 12, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 9999 }}>
          <div style={{ pointerEvents: 'auto', background: '#222', color: '#fff', padding: '10px 18px', borderRadius: 8, boxShadow: '0 6px 24px rgba(0,0,0,0.18)', fontWeight: 600 }}>
            Please sign up or log in to create a cache — redirecting…
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCache;
