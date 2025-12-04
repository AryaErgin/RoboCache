import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CacheCard from '../components/CacheCard';
import Badge from '../components/Badge';
import { featuredCaches } from '../utils/mockData';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <Badge label="Robotics treasure hunt" />
          <h1>Find, trade, and learn with robotics caches near you.</h1>
          <p>
            Explore geocache-style drops filled with robot parts, coding puzzles, and build
            challenges. Level up your skills while contributing to a global network of makers.
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
        <div className="hero-card">
          <div className="stat">
            <span className="label">Active caches</span>
            <span className="value">128</span>
          </div>
          <div className="stat">
            <span className="label">Parts traded</span>
            <span className="value">3.2k</span>
          </div>
          <div className="stat">
            <span className="label">Mentors</span>
            <span className="value">420</span>
          </div>
        </div>
      </section>

      <section className="section how-it-works">
        <div>
          <h2>How it works</h2>
          <ol>
            <li><strong>Explore:</strong> Scan the map for nearby robotics caches.</li>
            <li><strong>Find:</strong> Follow hints, unlock the box, and claim a part or challenge.</li>
            <li><strong>Log & Learn:</strong> Record your find, share notes, and earn XP toward badges.</li>
          </ol>
        </div>
      </section>

      <section className="section featured">
        <div className="section-header">
          <h2>Featured robotics caches</h2>
          <Link to="/explore" className="section-link">See all</Link>
        </div>
        <div className="cache-grid">
          {featuredCaches.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
