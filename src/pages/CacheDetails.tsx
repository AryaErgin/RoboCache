import { useParams, Link } from 'react-router-dom';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { caches } from '../utils/mockData';
import '../styles/pages/CacheDetails.css';

function CacheDetails() {
  const { cacheId } = useParams();
  const cache = caches.find((item) => item.id === cacheId) ?? caches[0];

  return (
    <div className="page cache-details-page">
      <div className="breadcrumbs">
        <Link to="/explore">← Back to explore</Link>
      </div>
      <header className="cache-header">
        <div>
          <p className="eyebrow">Cache</p>
          <h1>{cache.title}</h1>
          <p className="location">{cache.location}</p>
          <div className="meta">
            <Badge label={cache.category} tone="warning" />
            <Badge label={`Difficulty: ${cache.difficulty}`} />
            <Badge label={`${cache.xp} XP`} tone="success" />
          </div>
        </div>
        <Button variant="secondary">Log this find</Button>
      </header>

      <section className="cache-section">
        <h3>What's inside</h3>
        <p>{cache.description}</p>
        <ul>
          {cache.tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>

      <section className="cache-section">
        <h3>Coordinates</h3>
        <div className="coord-box">
          <p>Lat: {cache.coordinates.lat}</p>
          <p>Lng: {cache.coordinates.lng}</p>
          <p>Hint: {cache.hint}</p>
        </div>
      </section>

      <section className="cache-section">
        <h3>Educational note</h3>
        <p>{cache.education}</p>
      </section>
    </div>
  );
}

export default CacheDetails;
