import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import DepartmentPortal from './components/DepartmentPortal';
import CitizenDashboard from './components/CitizenDashboard';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
// Import the new Register component
import Register from './components/Register';
import { Building2 } from 'lucide-react';

const Layout = ({ children }) => {
  const location = useLocation();
  // Hide navbar on Landing, Login, and Register pages
  const hideNav = ['/', '/login', '/register'].includes(location.pathname);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    // min-h-screen ensures the container is at least as tall as the screen
    // flex flex-col stacks items vertically
    <div className="min-h-screen flex flex-col font-sans">
      {/* --- GOVERNMENT TOP STRIP --- */}
      <div className="bg-slate-100 border-b border-slate-300 py-1 px-4 text-xs font-medium text-slate-600 flex justify-between items-center">
        <div className="flex gap-4">
          <span>Eklavya portal</span>
          <span>Eklavya Coordination</span>
        </div>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-blue-700"></span>
          <span className="cursor-pointer hover:text-blue-700"></span>
          <span>A+ A-</span>
        </div>
      </div>

      {/* --- MAIN NAVBAR --- */}
      {!hideNav && (
        <nav className="bg-white border-b-4 border-blue-900 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex justify-between items-center">
            {/* Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-blue-900 text-white p-2 rounded shadow-sm group-hover:bg-blue-800 transition">
                <Building2 size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-slate-900 leading-none tracking-tight">InfraSync</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">National Coordination Portal</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
                <Link to="/" className="hover:text-blue-700">Home</Link>
                <Link to="/dashboard" className="hover:text-blue-700">Citizen Services</Link>
                <Link to="#" className="hover:text-blue-700">Notices</Link>
                <Link to="#" className="hover:text-blue-700">Contact</Link>
              </div>

              <div className="h-8 w-px bg-slate-200 mx-2"></div>

              <button onClick={handleLogout} className="text-sm font-bold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-5 py-2 rounded transition-colors">
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* --- MAIN CONTENT AREA (Fixes Footer Overlap) --- */}
      {/* flex-1 makes this element grow to fill unused space, pushing the footer down */}
      <main className="flex-1 bg-slate-50">
        {children}
      </main>

      {/* --- GOVT FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-sm border-t-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider"></h4>
            <p>.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Grievance Redressal</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h4>
            <p>Ministry of Urban Development</p>
            <p>Nirman Bhawan, New Delhi</p>
            <p>helpdesk@infrasync.gov.in</p>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t border-slate-800">
          © 2026 InfraSync. All Rights Reserved. Government of India.
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* Add the new route for the Registration page */}
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<DepartmentPortal />} />
          <Route path="/dashboard" element={<CitizenDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;