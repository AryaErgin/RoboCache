import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import Badge from '../components/Badge';
import CacheCard from '../components/CacheCard';
import { caches } from '../utils/mockData';
import { auth } from '../utils/firebase';
import '../styles/pages/Profile.css';

function Profile() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const created = caches.slice(0, 2);
  const found = caches.slice(2, 4);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/', { replace: true });
    }
  }, [loading, user, navigate]);

  if (loading) {
    return (
      <div className="page profile-page">
        <p className="muted">Checking your RoboCache account…</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page profile-page">
      <header className="profile-header">
        <div>
          <p className="eyebrow">Maker profile</p>
          <h1>{user.displayName || user.email}</h1>
          <p className="lede">Mystery cache explorer. Rewards unlock only when you check in—keep the surprises going.</p>
          <div className="badges">
            <Badge label="Level 7" tone="success" />
            <Badge label="Mechanics" />
            <Badge label="Safety first" tone="warning" />
          </div>
        </div>
        <div className="stats">
          <div>
            <span className="label">Caches found</span>
            <span className="value">22</span>
          </div>
          <div>
            <span className="label">Caches created</span>
            <span className="value">5</span>
          </div>
          <div>
            <span className="label">XP</span>
            <span className="value">6,450</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Created caches</h2>
          <span className="section-link">See all</span>
        </div>
        <div className="cache-grid">
          {created.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Recent finds</h2>
          <span className="section-link">See all</span>
        </div>
        <div className="cache-grid">
          {found.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Profile;
