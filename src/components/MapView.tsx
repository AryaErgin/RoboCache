import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from './MapView.module.css';
import type { Cache } from '../utils/types';

interface Props { caches: Cache[] }

const libraries: ('places')[] = ['places'];

function MapView({ caches }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || 'set-google-maps-key',
    libraries,
  });

  const center = useMemo(() => {
    if (caches.length) return caches[0].coordinates;
    return { lat: 37.7749, lng: -122.4194 }; // default to SF
  }, [caches]);

  if (!apiKey) {
    return <div className={styles.mapFallback}>Add VITE_GOOGLE_MAPS_API_KEY to load the live map.</div>;
  }

  if (loadError) {
    return <div className={styles.mapFallback}>Map failed to load. Check your Google Maps API key.</div>;
  }

  return (
    <div className={styles.map}>
      {!isLoaded && <div className={styles.mapFallback}>Loading map…</div>}
      {isLoaded && (
        <GoogleMap
          zoom={4}
          center={center}
          mapContainerClassName={styles.mapCanvas}
          options={{
            disableDefaultUI: true,
            styles: [
              { elementType: 'geometry', stylers: [{ color: '#000000' }] },
              { elementType: 'labels.text.fill', stylers: [{ color: '#ffffff' }] },
              { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }] },
              { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#1c1c1c' }] },
            ],
          }}
        >
          {caches.map((cache) => (
            <MarkerF
              key={cache.id}
              position={cache.coordinates}
              title={cache.title}
              label={{ text: cache.title, className: styles.markerLabel }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapView;
