import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../assets/logo.svg';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Create Cache', to: '/create' },
  { label: 'Profile', to: '/profile' },
  { label: 'About', to: '/about' },
];

function Header() {
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
      </nav>
      <div className={styles.actions}>
        <Link to="/auth" className={styles.authLink}>Login / Sign up</Link>
      </div>
    </header>
  );
}

export default Header;
