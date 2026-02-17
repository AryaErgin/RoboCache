import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import styles from './Header.module.css';
import logo from '../assets/logo/robocache-mark-inverted.svg';
import integraLogo from '../assets/integra (1).png';
import { auth } from '../utils/firebase';

const navItems = [
  { label: 'Platform', to: '/' },
  { label: 'Explore Caches', to: '/explore' },
  { label: 'List a Part', to: '/create' },
  { label: 'FAQ', to: '/faq' },
];

function Header() {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => setUser(current));
    return () => unsub();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoShell}>
              <img src={logo} alt="RoboCache platform logo" className={styles.logo} width={48} height={48} />
            </span>
            <div>
              <strong>RoboCache</strong>
              <span>FRC parts exchange infrastructure</span>
            </div>
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <NavLink to="/profile" className={styles.profile}>
              Profile
            </NavLink>
          ) : (
            <NavLink to="/auth" className={styles.profile}>
              Login
            </NavLink>
          )}
          <a href="https://team3646.com/" target="_blank" rel="noreferrer" className={styles.integraBadge}>
            <img
              src={integraLogo}
              alt="FRC Team 3646 INTEGRA creator badge"
              className={styles.integraLogo}
              width={28}
              height={28}
            />
            <span>Team 3646</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
