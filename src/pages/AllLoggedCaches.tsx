import { useEffect, useState } from 'react';
import CacheCard from '../components/CacheCard';
import { fetchCaches } from '../utils/firestore';
import { caches as fallbackCaches } from '../utils/mockData';
import type { Cache } from '../utils/types';
import '../styles/pages/AllCaches.css';

const ITEMS_PER_PAGE = 9; // 3x3 grid

function AllLoggedCaches() {
  const [cacheList, setCacheList] = useState<Cache[]>(fallbackCaches);
  const [status, setStatus] = useState('Loading caches from Firestore…');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCaches()
      .then((data) => {
        if (data.length) {
          // Filter to show only recently logged caches (with lastLoggedAt)
          const loggedCaches = data.filter((cache) => cache.lastLoggedAt);
          setCacheList(loggedCaches.length > 0 ? loggedCaches : data);
          setStatus('');
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

  const totalPages = Math.ceil(cacheList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCaches = cacheList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="page all-caches-page">
      <div className="caches-header">
        <h1>Recently Logged Caches</h1>
        <p>Explore the caches you and other hunters have recently logged.</p>
      </div>

      {status && <p className="muted status-text">{status}</p>}

      <div className="cache-grid-3x3">
        {paginatedCaches.map((cache) => (
          <CacheCard key={cache.id} cache={cache} />
        ))}
      </div>

      {cacheList.length === 0 && <p className="muted">No logged caches found.</p>}

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
  );
}

export default AllLoggedCaches;
