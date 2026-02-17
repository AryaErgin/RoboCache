import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const CacheDetails = lazy(() => import('./pages/CacheDetails'));
const CreateCache = lazy(() => import('./pages/CreateCache'));
const Profile = lazy(() => import('./pages/Profile'));
const Auth = lazy(() => import('./pages/Auth'));
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Robocaching101 = lazy(() => import('./pages/Robocaching101'));
const AllCreatedCaches = lazy(() => import('./pages/AllCreatedCaches'));
const AllLoggedCaches = lazy(() => import('./pages/AllLoggedCaches'));

function App() {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="page">
            <p className="muted">Loading RoboCache...</p>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-created" element={<AllCreatedCaches />} />
          <Route path="/all-logged" element={<AllLoggedCaches />} />
          <Route path="/caches/:cacheId" element={<CacheDetails />} />
          <Route path="/create" element={<CreateCache />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/robocaching-101" element={<Robocaching101 />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
