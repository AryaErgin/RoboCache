import { Link } from 'react-router-dom';
import Badge from './Badge';
import Button from './Button';
import styles from './CacheCard.module.css';
import type { Cache } from '../utils/types';

type CacheCardProps = { cache: Cache };

function CacheCard({ cache }: CacheCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3>{cache.title}</h3>
          <p className={styles.subtitle}>{cache.location}</p>
        </div>
        <Badge label={cache.category} tone="warning" />
      </div>
      <p className={styles.description}>{cache.description}</p>
      <div className={styles.meta}>
        <span>Difficulty: {cache.difficulty}</span>
        <span>XP: {cache.xp}</span>
        <span>Tools: {cache.tools.join(', ')}</span>
      </div>
      <div className={styles.actions}>
        <Button variant="secondary">
          <Link to={`/caches/${cache.id}`} className={styles.link}>View details</Link>
        </Button>
        <Button variant="ghost">Save</Button>
      </div>
    </article>
  );
}

export default CacheCard;
