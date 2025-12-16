import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.columns}>
        <div>
          <h4>RoboCache</h4>
          <p>Discover, share, and trade robotics treasures in the real world.</p>
        </div>
        <div>
          <h5>Navigate</h5>
          <ul>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/create">Create</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5>Support</h5>
          <ul>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/auth">Login</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.meta}>© {new Date().getFullYear()} RoboCache. Built by <a href="https://team3646.com/" target="_blank" rel="noopener noreferrer">INTEGRA 3646</a>.</div>
    </footer>
  );
}

export default Footer;
