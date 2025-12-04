import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import styles from './MapView.module.css';
import type { Cache } from '../utils/types';

interface Props { caches: Cache[] }

const libraries: ('places')[] = ['places'];

const mapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: '#0f1624' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#dfe7f5' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0b1220' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f7b500' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#122035' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#113326' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#1b2c43' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#0f1b2e' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#1a2432' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0b243f' }],
  },
];

const markerIcon =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="60" viewBox="0 0 44 60" fill="none">
      <path d="M22 0C10.393 0 1 9.393 1 21c0 13.86 14.422 29.79 19.557 35.21a3.5 3.5 0 0 0 4.886 0C28.578 50.79 43 34.86 43 21 43 9.393 33.607 0 22 0Z" fill="#f7b500" stroke="#0f1624" stroke-width="2"/>
      <circle cx="22" cy="21" r="9" fill="#0f1624" stroke="#fefefe" stroke-width="2" />
      <circle cx="22" cy="21" r="4" fill="#fefefe" />
    </svg>
  `);

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
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            gestureHandling: 'greedy',
            backgroundColor: '#0f1624',
          }}
        >
          {caches.map((cache) => (
            <MarkerF
              key={cache.id}
              position={cache.coordinates}
              title={cache.title}
              icon={markerIcon}
              label={{ text: cache.title, className: styles.markerLabel, color: '#0f1624' }}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapView;