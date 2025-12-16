import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CacheCard from '../components/CacheCard';
import Badge from '../components/Badge';
import { featuredCaches } from '../utils/mockData';
import stepExplore from '../assets/step-explore.svg';
import stepFind from '../assets/step-find.svg';
import stepLog from '../assets/step-log.svg';
import '../styles/pages/Home.css';

function Home() {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <Badge label="Robotics treasure hunt" />
          <h1>Find, trade, and learn with robotics caches near you.</h1>
          <p>
            Explore geocache-style drops packed with surprise robotics rewards. No puzzles or
            tasks—just follow the hint, claim the cache, and unlock XP toward badges.
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
        <div className="section-header">
          <h2>How it works</h2>
          <p className="section-subtitle">
            Smooth, task-free steps so you can focus on discovering surprise robotics rewards.
          </p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <img src={stepExplore} alt="Explore caches" />
            <div className="step-copy">
              <h3>Explore</h3>
              <p>Browse an elevated map view with curated cache pins and quick-glance hints.</p>
            </div>
          </div>
          <div className="step-card">
            <img src={stepFind} alt="Find cache" />
            <div className="step-copy">
              <h3>Find</h3>
              <p>Navigate to the spot, open the drop, and uncover the mystery reward—no tasks needed.</p>
            </div>
          </div>
          <div className="step-card">
            <img src={stepLog} alt="Log and learn" />
            <div className="step-copy">
              <h3>Log & learn</h3>
              <p>Log your find, collect XP, and share insights with builders nearby.</p>
            </div>
          </div>
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
