import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Badge from '../components/Badge';
import Button from '../components/Button';
import MapView from '../components/MapView';
import { fetchCacheById } from '../utils/firestore';
import { caches } from '../utils/mockData';
import type { Cache } from '../utils/types';
import '../styles/pages/CacheDetails.css';

function CacheDetails() {
  const { cacheId } = useParams();
  const [cache, setCache] = useState<Cache | null>(null);
  const [status, setStatus] = useState('Loading from Firestore…');

  useEffect(() => {
    if (!cacheId) return;
    fetchCacheById(cacheId)
      .then((result) => {
        if (result) {
          setCache(result);
          setStatus('Loaded from Google Cloud Firestore.');
        } else {
          const fallback = caches.find((item) => item.id === cacheId) ?? caches[0];
          setCache(fallback);
          setStatus('Cache not found in Firestore. Showing local example.');
        }
      })
      .catch(() => {
        const fallback = caches.find((item) => item.id === cacheId) ?? caches[0];
        setCache(fallback);
        setStatus('Firestore unavailable. Showing local example.');
      });
  }, [cacheId]);

  const activeCache = cache ?? caches[0];

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
            <Badge label={`Difficulty: ${activeCache.difficulty}`} />
            <Badge label={`${activeCache.xp} XP`} tone="success" />
          </div>
        </div>
        <Button variant="secondary">Log this find</Button>
      </header>

      <section className="cache-section">
        <h3>What's inside</h3>
        <p>{activeCache.description}</p>
        <ul>
          {activeCache.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="cache-section">
        <h3>Coordinates</h3>
        <div className="coord-box">
          <p>Lat: {activeCache.coordinates.lat}</p>
          <p>Lng: {activeCache.coordinates.lng}</p>
          <p>Hint: {activeCache.hint}</p>
          <p className="muted">{status}</p>
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
