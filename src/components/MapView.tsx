import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './MapView.module.css';
import type { Cache } from '../utils/types';
import { colors } from '../theme/tokens';

interface Props {
  caches: Cache[];
  onMarkerClick?: (cacheId: string) => void;
}

const libraries: ('places')[] = ['places'];
const defaultCenter = { lat: 39.0, lng: 35.2 };

const mapStyles: google.maps.MapTypeStyle[] = [
  { elementType: 'geometry', stylers: [{ color: colors.map.land }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: colors.map.landAlt }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: colors.map.water }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: colors.map.poi }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: colors.map.landAlt }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: colors.map.boundary }, { weight: 1.1 }] },
  { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: colors.map.boundary }, { weight: 1.3 }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: colors.map.roadMajor }, { weight: 1.2 }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: colors.map.roadStroke }, { weight: 0.9 }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: colors.map.roadMinor }, { weight: 0.8 }] },
  { featureType: 'road.arterial', elementType: 'geometry.stroke', stylers: [{ color: colors.map.roadStroke }, { weight: 0.7 }] },
  { featureType: 'road.local', elementType: 'geometry', stylers: [{ color: colors.map.roadStroke }, { weight: 0.4 }] },
  { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: colors.map.roadMinor }] },
  { featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: colors.map.poi }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: colors.map.labelPrimary }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: colors.background.primary }, { weight: 3 }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: colors.map.labelSecondary }] },
];

const markerIcon =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="60" viewBox="0 0 44 60" fill="none">
      <path d="M22 0C10.393 0 1 9.393 1 21c0 13.86 14.422 29.79 19.557 35.21a3.5 3.5 0 0 0 4.886 0C28.578 50.79 43 34.86 43 21 43 9.393 33.607 0 22 0Z" fill="${colors.accent.primary}" stroke="${colors.background.primary}" stroke-width="2"/>
      <circle cx="22" cy="21" r="9" fill="${colors.background.primary}" stroke="${colors.text.primary}" stroke-width="2" />
      <circle cx="22" cy="21" r="4" fill="${colors.text.primary}" />
    </svg>
  `);

function MapView({ caches, onMarkerClick }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || 'set-google-maps-key',
    libraries,
  });

  const center = useMemo(() => {
    if (caches.length > 0) return caches[0].coordinates;
    return defaultCenter;
  }, [caches]);

  const applyViewport = useCallback(
    (map: google.maps.Map) => {
      if (!caches.length) {
        map.setCenter(defaultCenter);
        map.setZoom(4);
        return;
      }

      if (caches.length === 1) {
        map.setCenter(caches[0].coordinates);
        map.setZoom(6);
        return;
      }

      const bounds = new google.maps.LatLngBounds();
      caches.forEach((cache) => bounds.extend(cache.coordinates));
      map.fitBounds(bounds, { top: 56, right: 56, bottom: 56, left: 56 });

      const zoom = map.getZoom();
      if (typeof zoom === 'number' && zoom > 8) {
        map.setZoom(8);
      }
    },
    [caches],
  );

  const handleMapLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      applyViewport(map);
    },
    [applyViewport],
  );

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    applyViewport(mapRef.current);
  }, [applyViewport, isLoaded]);

  if (!apiKey) {
    return <div className={styles.mapFallback}>Add VITE_GOOGLE_MAPS_API_KEY to load the live map.</div>;
  }

  if (loadError) {
    return <div className={styles.mapFallback}>Map failed to load. Check your Google Maps API key.</div>;
  }

  return (
    <div className={styles.map}>
      {!isLoaded && <div className={styles.mapFallback}>Loading map...</div>}
      {isLoaded && (
        <GoogleMap
          zoom={5}
          center={center}
          onLoad={handleMapLoad}
          mapContainerClassName={styles.mapCanvas}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            clickableIcons: false,
            gestureHandling: 'greedy',
            backgroundColor: colors.map.land,
          }}
        >
          {caches.map((cache) => (
            <MarkerF
              key={cache.id}
              position={cache.coordinates}
              title={cache.title}
              icon={markerIcon}
              label={{ text: cache.title, className: styles.markerLabel, color: colors.background.primary }}
              onClick={() => onMarkerClick?.(cache.id)}
            />
          ))}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapView;
