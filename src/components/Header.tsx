import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import styles from './Header.module.css';
import logo from '../assets/logo.svg';
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
      </div>
    </header>
  );
}

export default Header;
