import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Building2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://infrasync-backend.onrender.com/api/auth/login', formData);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));

      // Redirect based on Role
      if (user.role === 'OFFICIAL') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      alert('Invalid Credentials! Try: admin/admin123');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500 mt-2">Login to InfraSync Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input type="text" className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
              onChange={e => setFormData({...formData, username: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all bg-slate-50 focus:bg-white"
              onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          <button className="w-full bg-blue-900 text-white p-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
            Sign In
          </button>
        </form>

        {/* --- NEW: CREATE ACCOUNT LINK --- */}
        <div className="mt-6 text-center text-slate-600">
          <p>Don't have an account?{' '}
            <Link to="/register" className="font-bold text-blue-700 hover:underline">
              Create Account
            </Link>
          </p>
        </div>

        {/* --- GOVT FOOTER TEXT --- */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 size={16} className="text-slate-400" />
            <span className="font-semibold">Official Ministry Portal</span>
          </div>
          <p>Demo Admin: <span className="font-mono bg-slate-100 px-1 rounded">admin</span> / <span className="font-mono bg-slate-100 px-1 rounded">admin123</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;