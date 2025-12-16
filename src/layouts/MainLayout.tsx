import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/layout.css';

interface Props { children: ReactNode; }

function MainLayout({ children }: Props) {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
