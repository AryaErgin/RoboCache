import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Badge from '../components/Badge';
import Button from '../components/Button';
import MapView from '../components/MapView';
import { fetchCacheById, logCacheForUser } from '../utils/firestore';
import { auth } from '../utils/firebase';
import { caches } from '../utils/mockData';
import type { Cache } from '../utils/types';
import '../styles/pages/CacheDetails.css';

function CacheDetails() {
  const { cacheId } = useParams();
  const [cache, setCache] = useState<Cache | null>(null);
  const [loadingLog, setLoadingLog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cacheId) return;
    fetchCacheById(cacheId)
      .then((result) => {
        if (result) {
          setCache(result);
        } else {
          const fallback = caches.find((item) => item.id === cacheId) ?? caches[0];
          setCache(fallback);
        }
      })
      .catch(() => {
        const fallback = caches.find((item) => item.id === cacheId) ?? caches[0];
        setCache(fallback);
      });
  }, [cacheId]);

  const activeCache = cache ?? caches[0];

  const formatLastLogged = (c: Cache) => {
    if (!c.lastLoggedBy) return null;
    try {
      const t: any = c.lastLoggedAt;
      const date = t?.toDate ? t.toDate() : (t?.seconds ? new Date(t.seconds * 1000) : new Date(t));
      return (
        <p className="muted">Last logged by {c.lastLoggedBy} at {date.toLocaleString()}</p>
      );
    } catch {
      return <p className="muted">Last logged by {c.lastLoggedBy}</p>;
    }
  };

  return (
    <div className="page cache-details-page">
      <div className="breadcrumbs">
        <Link to="/explore">← Back to explore</Link>
      </div>
      <header className="cache-header">
        <div>
          <p className="eyebrow">Cache</p>
          <h1>{activeCache.title}</h1>
          <p className="location">{activeCache.location}</p>
          <div className="meta">
            <Badge label={activeCache.category} tone="warning" />
            <Badge label={`${activeCache.xp} XP`} tone="success" />
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={async () => {
            if (!auth.currentUser) {
              navigate('/auth');
              return;
            }
            if (loadingLog) return;
            setLoadingLog(true);
            try {
              const name = auth.currentUser?.displayName || auth.currentUser?.email || auth.currentUser?.uid;
              await logCacheForUser(auth.currentUser.uid, activeCache.id, activeCache.xp ?? 0, name as string);
              // refresh cache details to show last logged info
              const refreshed = await fetchCacheById(activeCache.id);
              if (refreshed) setCache(refreshed);
              setLoadingLog(false);
            } catch (err: any) {
              alert(err?.message || 'Could not log cache.');
              setLoadingLog(false);
            }
          }}
        >
          {loadingLog ? 'Logging…' : 'Log this find'}
        </Button>
      </header>

      <section className="cache-section">
        <h3>Rewards</h3>
        <p>{activeCache.rewardSummary}</p>
        <p>{activeCache.description}</p>
      </section>

      <section className="cache-section">
        <h3>Coordinates</h3>
        <div className="coord-box">
          <p>Lat: {activeCache.coordinates.lat}</p>
          <p>Lng: {activeCache.coordinates.lng}</p>
          <p>Hint: {activeCache.hint}</p>
          {formatLastLogged(activeCache)}
        </div>
        <MapView caches={[activeCache]} />
      </section>

      <section className="cache-section">
        <h3>Educational note</h3>
        <p>{activeCache.education}</p>
      </section>
    </div>
  );
}

export default CacheDetails;
