import { useEffect, useMemo, useState } from 'react';
import CacheCard from '../components/CacheCard';
import FilterBar from '../components/FilterBar';
import MapView from '../components/MapView';
import { fetchCaches } from '../utils/firestore';
import { caches as fallbackCaches } from '../utils/mockData';
import type { Cache, CacheFilters } from '../utils/types';
import '../styles/pages/Explore.css';

const defaultFilters: CacheFilters = { location: '', category: ''};

function Explore() {
  const [cacheList, setCacheList] = useState<Cache[]>(fallbackCaches);
  const [status, setStatus] = useState('Loading live caches from Firestore…');
  const [filters, setFilters] = useState<CacheFilters>(defaultFilters);

  useEffect(() => {
    fetchCaches()
      .then((data) => {
        if (data.length) {
          setCacheList(data);
          setStatus('Loaded from Google Cloud Firestore.');
        } else {
          setCacheList(fallbackCaches);
          setStatus('No cloud caches found yet. Showing local examples.');
        }
      })
      .catch(() => {
        setCacheList(fallbackCaches);
        setStatus('Firestore unavailable. Showing local examples.');
      });
  }, []);

  const filtered = useMemo(() =>
    cacheList.filter((cache) => {
      const matchesLocation = cache.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCategory = cache.category.toLowerCase().includes(filters.category.toLowerCase());
      return matchesLocation && matchesCategory
    }), [cacheList, filters]);

  return (
    <div className="page explore-page">
      <div className="explore-header">
        <div>
          <p className="eyebrow">Map & filters</p>
          <h1>Explore robotics caches near you</h1>
          <p className="lede">Browse community drops with mystery robotics rewards, just discover and claim.</p>
        </div>
      </div>

      <FilterBar filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

      <div className="explore-layout">
        <div className="map-column">
          <MapView caches={filtered} />
          <p className="muted status-text">{status}</p>
        </div>
        <div className="list-column">
          {filtered.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
          {filtered.length === 0 && <p className="muted">No caches found. Adjust filters to see more.</p>}
        </div>
      </div>
    </div>
  );
}

export default Explore;
