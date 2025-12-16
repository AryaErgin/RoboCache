import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import CacheCard from '../components/CacheCard';
import Badge from '../components/Badge';
import { featuredCaches as fallbackFeatured } from '../utils/mockData';
import { fetchCaches } from '../utils/firestore';
import type { Cache } from '../utils/types';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <Badge label="Robotics treasure hunt" />
          <h1>Find, trade, and learn with robotics caches near you.</h1>
          <p>
            Explore geocache-style drops packed with surprise robotics rewards. Follow the hint, claim the cache, and unlock XP toward badges.
          </p>
          <div className="hero-actions">
            <Button variant="secondary">
              <Link to="/explore">Start exploring</Link>
            </Button>
            <Button variant="ghost">
              <Link to="/create">Create a cache</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section how-it-works">
        <div>
          <h2>How it works</h2>
          <ol>
            <li><strong>Explore:</strong> Scan the map for nearby robotics caches.</li>
            <li><strong>Find:</strong> Follow hints, open the cache, and reveal a mystery reward.</li>
            <li><strong>Log & Learn:</strong> Record your find, share notes, and earn XP toward badges.</li>
          </ol>
        </div>
      </section>

      <section className="section featured">
        <div className="section-header">
          <h2>Featured robotics caches</h2>
          <Link to="/explore" className="section-link">See all</Link>
        </div>
        <FeaturedGrid />
      </section>
    </div>
  );
}

function FeaturedGrid() {
  const [featured, setFeatured] = useState<Cache[]>(fallbackFeatured);

  useEffect(() => {
    fetchCaches()
      .then((data) => {
        if (data && data.length > 0) setFeatured(data.slice(0, 3));
      })
      .catch(() => {
        // keep local fallback
      });
  }, []);

  return (
    <div className="cache-grid">
      {featured.map((cache) => (
        <CacheCard key={cache.id} cache={cache} />
      ))}
    </div>
  );
}

export default Home;
