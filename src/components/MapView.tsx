import styles from './MapView.module.css';
import type { Cache } from '../utils/types';

interface Props { caches: Cache[] }

function MapView({ caches }: Props) {
  return (
    <div className={styles.map}>
      <div className={styles.mapHeader}>Interactive map (placeholder)</div>
      <ul className={styles.mapList}>
        {caches.map((cache) => (
          <li key={cache.id}>
            <span className={styles.marker} />
            <div>
              <strong>{cache.title}</strong>
              <div className={styles.coords}>{cache.coordinates.lat.toFixed(3)}, {cache.coordinates.lng.toFixed(3)}</div>
              <small>{cache.location}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MapView;
