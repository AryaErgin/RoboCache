import Button from '../components/Button';
import FormInput from '../components/FormInput';
import '../styles/pages/Auth.css';

function Auth() {
  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1>Login or Sign up</h1>
        <FormInput label="Email" type="email" placeholder="you@example.com" />
        <FormInput label="Password" type="password" placeholder="••••••••" />
        <Button variant="secondary" type="button">Continue</Button>
        <p className="muted">By continuing you agree to community safety guidelines.</p>
      </div>
    </div>
  );
}

export default Auth;
