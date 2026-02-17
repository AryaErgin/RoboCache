import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CacheCard from '../components/CacheCard';
import FilterBar from '../components/FilterBar';
import MapView from '../components/MapView';
import { fetchCaches } from '../utils/firestore';
import { caches as fallbackCaches } from '../utils/mockData';
import type { Cache, CacheFilters } from '../utils/types';
import '../styles/pages/Explore.css';

const defaultFilters: CacheFilters = { location: '', category: ''};
const ITEMS_PER_PAGE = 9; // 3x3 grid

function Explore() {
  const navigate = useNavigate();
  const [cacheList, setCacheList] = useState<Cache[]>(fallbackCaches);
  const [status, setStatus] = useState('Loading live caches from Firestore…');
  const [filters, setFilters] = useState<CacheFilters>(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);

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

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCaches = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="page explore-page">
      <div className="explore-header">
        <div>
          <p className="eyebrow">FRC Robotics Geocaching Map & Filters</p>
          <h1>Explore FIRST Robotics and FRC Caches Near You</h1>
          <p className="lede">Browse geocaching-style mystery robotics drops with rewards designed for FIRST Robotics teams, FRC participants, and robotics enthusiasts. Find caches created by FRC Team INTEGRA 3646 and other teams.</p>
        </div>
      </div>

      <FilterBar filters={filters} onChange={setFilters} onReset={() => setFilters(defaultFilters)} />

      <div className="explore-map-section">
        <MapView caches={filtered} onMarkerClick={(cacheId) => navigate(`/caches/${cacheId}`)} />
        <p className="muted status-text">{status}</p>
      </div>

      <div className="explore-list-section">
        <div className="cache-grid-3x3">
          {paginatedCaches.map((cache) => (
            <CacheCard key={cache.id} cache={cache} />
          ))}
        </div>
        {filtered.length === 0 && <p className="muted">No caches found. Adjust filters to see more.</p>}

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              ← Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
