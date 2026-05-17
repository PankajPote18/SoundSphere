import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SettingsPage from './pages/SettingsPage';
import SearchPage from './pages/SearchPage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import PlansPage from './pages/PlansPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import PlayerPage from './pages/PlayerPage';
import { PremiumModalProvider } from './context/PremiumModalContext';

function App() {
  return (
    <Router>
      <PremiumModalProvider>
        <Routes>
          {/* Player Route - Standalone Fullscreen */}
          <Route path="/player/:id" element={<PlayerPage />} />

          {/* Admin Routes - Standalone Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="users" element={<div className="text-xl">Users Management Coming Soon</div>} />
          </Route>

          {/* Public Routes with Navbar/Sidebar */}
          <Route path="*" element={
            <div className="min-h-screen bg-[#0a0f1c] flex flex-col md:pl-16 pb-16 md:pb-0 relative">
              <Sidebar />
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/movie/:id" element={<DetailPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/verify-otp" element={<OtpPage />} />
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
