import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BackToTop from './components/BackToTop';
import QuoteModal from './components/QuoteModal';
import LightboxModal from './components/LightboxModal';

// Pages
import Home from './pages/Home';
import Construction from './pages/Construction';
import Realtor from './pages/Realtor';
import Interiors from './pages/Interiors';
import AboutContact from './pages/AboutContact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Universal Sticky Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/realtor" element={<Realtor />} />
          <Route path="/interiors" element={<Interiors />} />
          <Route path="/about-contact" element={<AboutContact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Modals & Floating Tools */}
      <QuoteModal />
      <LightboxModal />

      <div className="floating-widgets">
        <WhatsAppButton />
        <BackToTop />
      </div>

      {/* Universal Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;

