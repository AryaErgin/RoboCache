import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { onAuthStateChanged, type User } from 'firebase/auth';
import Badge from '../components/Badge';
import CacheCard from '../components/CacheCard';
import { caches } from '../utils/mockData';
import { auth } from '../utils/firebase';
import { fetchUserStats } from '../utils/firestore';
import '../styles/pages/Profile.css';

function Profile() {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const created = caches.slice(0, 2);
  const found = caches.slice(2, 4);
  const [stats, setStats] = useState<{ foundCount: number; createdCount: number; xp: number } | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserStats(user.uid).then((s) => {
        if (s) setStats({ foundCount: s.foundCount ?? 0, createdCount: s.createdCount ?? 0, xp: s.xp ?? 0 });
      }).catch(() => {
        setStats(null);
      });
    }
  }, [user]);

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
    <div className="page profile-page" style={{ position: 'relative', minHeight: '80vh' }}>
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
            <span className="value">{stats ? stats.foundCount : '0'}</span>
          </div>
          <div>
            <span className="label">Caches created</span>
            <span className="value">{stats ? stats.createdCount : created.length}</span>
          </div>
          <div>
            <span className="label">XP</span>
            <span className="value">{stats ? stats.xp : '0'}</span>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-header">
          <h2>Created caches</h2>
          <Link to="/all-created" className="section-link">See all</Link>
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
          <Link to="/all-logged" className="section-link">See all</Link>
        </div>
        <div className="cache-grid">
          {found.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
        </div>
      </section>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: 48 }}>
        <button
          onClick={() => auth.signOut()}
          style={{
            padding: '14px 40px',
            background: 'var(--color-error)',
            color: 'var(--color-text-primary)',
            border: 'none',
            borderRadius: 24,
            fontWeight: 600,
            fontSize: 18,
            boxShadow: '0 2px 12px color-mix(in srgb, var(--color-error) 30%, transparent)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            letterSpacing: 1,
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default Profile;
