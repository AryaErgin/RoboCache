import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Badge from './Badge';
import Button from './Button';
import styles from './CacheCard.module.css';
import type { Cache } from '../utils/types';
import { auth } from '../utils/firebase';
import { logCacheForUser } from '../utils/firestore';

type CacheCardProps = { cache: Cache };

function CacheCard({ cache }: CacheCardProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formatLastLogged = () => {
    if (!cache.lastLoggedAt) return '';
    try {
      const t: any = cache.lastLoggedAt;
      const date = t?.toDate ? t.toDate() : (t?.seconds ? new Date(t.seconds * 1000) : new Date(t));
      return `at ${date.toLocaleString()}`;
    } catch {
      return '';
    }
  };
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>{cache.title}</h3>
          <p className={styles.subtitle}>{cache.location}</p>
        </div>
        <Badge label={cache.category} tone="warning" />
      </div>
      <p className={styles.description}>{cache.description}</p>
      <div className={styles.meta}>
        <span>XP: {cache.xp}</span>
        <span>Reward: {cache.rewardSummary}</span>
        {cache.lastLoggedBy && (
          <span>
            Last logged by: {cache.lastLoggedBy} {formatLastLogged()}
          </span>
        )}
      </div>
      <div className={styles.actions}>
        <Button variant="secondary">
          <Link to={`/caches/${cache.id}`} className={styles.link}>View details</Link>
        </Button>
        <Button variant="ghost">Save</Button>
        <Button
          variant="primary"
          onClick={async () => {
            if (!auth.currentUser) {
              navigate('/auth');
              return;
            }
            if (loading) return;
            setLoading(true);
            try {
              const name = auth.currentUser?.displayName || auth.currentUser?.email || auth.currentUser?.uid;
              await logCacheForUser(auth.currentUser.uid, cache.id, cache.xp ?? 0, name);
              // simple UX: reload to refresh lists
              window.location.reload();
            } catch (err: any) {
              alert(err?.message || 'Could not log cache.');
              setLoading(false);
            }
          }}
        >
          {loading ? 'Logging…' : 'Log'}
        </Button>
      </div>
    </article>
  );
}

export default CacheCard;
