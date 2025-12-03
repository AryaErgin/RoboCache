import { useMemo, useState } from 'react';
import CacheCard from '../components/CacheCard';
import FilterBar from '../components/FilterBar';
import MapView from '../components/MapView';
import { caches } from '../utils/mockData';
import type { CacheFilters } from '../utils/types';
import '../styles/pages/Explore.css';

const defaultFilters: CacheFilters = { location: '', category: '', difficulty: '' };

function Explore() {
  const [filters, setFilters] = useState<CacheFilters>(defaultFilters);

  const filtered = useMemo(() =>
    caches.filter((cache) => {
      const matchesLocation = cache.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesCategory = cache.category.toLowerCase().includes(filters.category.toLowerCase());
      const matchesDifficulty = cache.difficulty.toLowerCase().includes(filters.difficulty.toLowerCase());
      return matchesLocation && matchesCategory && matchesDifficulty;
    }), [filters]);

  return (
    <div className="page explore-page">
      <div className="explore-header">
        <div>
          <p className="eyebrow">Map & filters</p>
          <h1>Explore robotics caches near you</h1>
          <p className="lede">Browse community drops, challenges, and parts waiting to be discovered.</p>
        </div>
      </div>

      <FilterBar filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

      <div className="explore-layout">
        <div className="map-column">
          <MapView caches={filtered} />
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
