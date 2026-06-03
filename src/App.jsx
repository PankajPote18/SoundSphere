import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SettingsPage from './pages/SettingsPage';
import SettingsDetailPage from './pages/SettingsDetailPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import PlansPage from './pages/PlansPage';
import Player from './pages/Player';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAudios from './pages/admin/AdminAudios';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminAboutUs from './pages/admin/AdminAboutUs';
import AdminSettings from './pages/admin/AdminSettings';   // ← NEW
import AdminPages from './pages/admin/AdminPages';
import ScrollToTop from './components/ScrollToTop';
import { PremiumModalProvider } from './context/PremiumModalContext';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PremiumModalProvider>
        <Routes>
          {/* Auth & Player Routes - Standalone Fullscreen */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OtpPage />} />
          <Route path="/player/:id" element={<Player />} />

          {/* Admin Routes - Standalone Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="audios" element={<AdminAudios />} />
            <Route path="users" element={<div className="text-xl">Users Management Coming Soon</div>} />
            <Route path="subscriptions" element={<AdminSubscriptions />} />
            <Route path="settings" element={<AdminSettings />} />  {/* ← NEW */}
            <Route path="about-us" element={<AdminAboutUs />} />
            <Route path="pages" element={<AdminPages />} />
          </Route>

          {/* Public Routes with Navbar/Sidebar */}
          <Route path="*" element={
            <div className="min-h-dvh bg-bg-dark flex flex-col md:pl-16 pb-16 md:pb-0 relative">
              <Sidebar />
              <Navbar />
              <main className="flex-grow overflow-x-hidden w-full">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/audio/:id" element={<DetailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/page/:slug" element={<SettingsDetailPage />} />
                  <Route path="/plans" element={<PlansPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />
        </Routes>
      </PremiumModalProvider>
    </Router>
  );
}

export default App;
