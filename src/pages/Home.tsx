import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import CacheCard from '../components/CacheCard';
import Badge from '../components/Badge';
import { featuredCaches as fallbackFeatured } from '../utils/mockData';
import { fetchCaches } from '../utils/firestore';
import type { Cache } from '../utils/types';
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
        <h2>How it works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-icon">
              <img src={stepExplore} alt="Create an account" />
            </div>
            <h3>Create an account</h3>
            <p>Sign up to track your finds, create caches, and earn XP.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <img src={stepFind} alt="Find & trade" />
            </div>
            <h3>Find & trade</h3>
            <p>Locate the cache, take an item, and leave a robotics piece in return.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <img src={stepLog} alt="Log & Learn" />
            </div>
            <h3>Log & Learn</h3>
            <p>Record your find, share notes, and earn XP toward badges.</p>
          </div>
        </div>
      </section>

      <section className="section featured">
        <div className="section-header">
          <h2>Featured robotics caches</h2>
          <Link to="/explore" className="section-link">See all</Link>
        </div>
        <FeaturedGrid />
      </section>

      <section className="section learn-preview">
        <Link to="/robocaching-101" className="learn-box">
          <div className="learn-box-media">
            <img src="/assets/filler.svg" alt="Learn geocaching" />
          </div>
          <div className="learn-box-body">
            <h3>Robocaching 101</h3>
            <p>New to RoboCache? Learn the basics: how to find caches, trade fairly, and log your finds.</p>
            <span className="learn-box-cta">Read the guide →</span>
          </div>
        </Link>
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
