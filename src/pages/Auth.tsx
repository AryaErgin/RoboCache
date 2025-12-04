import { FormEvent, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { auth, googleProvider } from '../utils/firebase';
import '../styles/pages/Auth.css';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created with Firebase Auth.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Logged in with Firebase Auth.');
      }
    } catch (error) {
      console.error(error);
      setMessage('Auth failed. Check credentials or Firebase config.');
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage('Signed in with Google via Firebase Auth.');
    } catch (error) {
      console.error(error);
      setMessage('Google sign-in failed.');
    }
  };

  return (
    <div className="page auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Login or Sign up</h1>
        <div className="auth-toggle">
          <Button type="button" variant={mode === 'login' ? 'secondary' : 'ghost'} onClick={() => setMode('login')}>Login</Button>
          <Button type="button" variant={mode === 'signup' ? 'secondary' : 'ghost'} onClick={() => setMode('signup')}>Sign up</Button>
        </div>
        <FormInput label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormInput label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button variant="secondary" type="submit">Continue with Email</Button>
        <Button variant="ghost" type="button" onClick={handleGoogle}>Continue with Google</Button>
        <p className="muted">By continuing you agree to community safety guidelines.</p>
        {message && <p className="auth-status">{message}</p>}
      </form>
    </div>
  );
}

export default Auth;
