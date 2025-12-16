import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import CacheDetails from './pages/CacheDetails';
import CreateCache from './pages/CreateCache';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Robocaching101 from './pages/Robocaching101';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/caches/:cacheId" element={<CacheDetails />} />
        <Route path="/create" element={<CreateCache />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/robocaching-101" element={<Robocaching101 />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
