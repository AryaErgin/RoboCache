import Badge from '../components/Badge';
import CacheCard from '../components/CacheCard';
import { caches } from '../utils/mockData';
import '../styles/pages/Profile.css';

function Profile() {
  const created = caches.slice(0, 2);
  const found = caches.slice(2, 4);

  return (
    <div className="page profile-page">
      <header className="profile-header">
        <div>
          <p className="eyebrow">Maker profile</p>
          <h1>Alex Robotics</h1>
          <p className="lede">Mechanical specialist and high-school mentor. Exploring how open robotics can connect students to the field.</p>
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
