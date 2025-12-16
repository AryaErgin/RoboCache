import { Link } from 'react-router-dom';
import '../styles/pages/FAQ.css';

function Robocaching101() {
  return (
    <div className="page faq-page">
      <h1>Robocaching 101</h1>
      <div className="card">
        <img src="/assets/filler.svg" alt="robocaching" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 6 }} />
        <div style={{ padding: '1.25rem' }}>
          <h2>Learn about robocaching</h2>
          <p>Robocaching is a community-driven treasure hunt where participants find hidden containers and exchange small robotics-themed items.</p>
          <ol>
            <li><strong>Create an account:</strong> Sign up so you can log finds, create caches, and earn badges.</li>
            <li><strong>Search:</strong> Use the map and clues to find nearby RoboCaches.</li>
            <li><strong>Visit the cache:</strong> Be safe—choose public, accessible spots. Respect private property and local rules.</li>
            <li><strong>Trade fairly:</strong> Take one item and leave a robotics piece or item of equal or greater value.</li>
            <li><strong>Log your find:</strong> Record what you found, leave a helpful note, and earn XP.</li>
            <li><strong>Share:</strong> Add photos and tips for future finders.</li>
          </ol>
          <h3>Safety & Rules</h3>
          <p>Only place caches in safe, public locations. Do not hide caches in restricted or hazardous places. Taking without trading is not allowed—always leave something in return.</p>
          <Link to="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}

export default Robocaching101;
