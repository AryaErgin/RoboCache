import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div>
            <h4>RoboCache</h4>
            <p>
              RoboCache is a geocache-style FRC parts discovery and exchange platform for FIRST
              Robotics Competition teams.
            </p>
          </div>
          <div>
            <h5>Platform</h5>
            <ul>
              <li>
                <Link to="/explore">Explore Caches</Link>
              </li>
              <li>
                <Link to="/create">List a Part</Link>
              </li>
              <li>
                <Link to="/robocaching-101">How RoboCache Works</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Organization</h5>
            <ul>
              <li>
                <Link to="/about">About Team 3646 INTEGRA</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <a href="https://team3646.com/" target="_blank" rel="noreferrer">
                  FRC Team 3646 Website
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.meta}>
          <p>RoboCache is developed and maintained by FRC Team 3646 INTEGRA.</p>
          <p>
            (c) {new Date().getFullYear()} RoboCache. Built for stronger regional FIRST Robotics
            Competition ecosystems.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
