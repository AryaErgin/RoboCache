import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import styles from './Header.module.css';
import logo from '../assets/cachelogo.png';
import integra1 from '../assets/integra (1).png';
import integra2 from '../assets/integra (2).png';
import { auth } from '../utils/firebase';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Create Cache', to: '/create' },
  { label: 'About', to: '/about' },
];

function Header() {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => setUser(current));
    return () => unsub();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="RoboCache logo" className={styles.logo} />
          <span className={styles.title}>RoboCache</span>
        </Link>
      </div>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
        {user && (
          <NavLink
            to="/profile"
            className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            Profile
          </NavLink>
        )}
      </nav>
      <div className={styles.actions}>
        {!user && (
          <Link to="/auth" className={styles.authLink}>
            Login / Sign up
          </Link>
        )}
        <a href="https://team3646.com" target="_blank" rel="noopener noreferrer" className={styles.integraLogo}>
          <img src={integra1} alt="integra 1" className={styles.integraImg} />
          <img src={integra2} alt="integra 2" className={styles.integraImg} />
        </a>
      </div>
    </header>
  );
}

export default Header;
