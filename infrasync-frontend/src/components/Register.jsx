import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { UserPlus, Building2, AlertCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    accountType: 'Citizen', // This helps us decide the Role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Logic to set Role and Department based on selection
    const isCitizen = formData.accountType === 'Citizen';

    const payload = {
      username: formData.username,
      password: formData.password,
      role: isCitizen ? 'CITIZEN' : 'OFFICIAL',
      department: isCitizen ? null : formData.accountType // "Water Dept", "Roads Dept", etc.
    };

    try {
      // Send to Backend
      await axios.post('https://infrasync-backend.onrender.com/api/auth/signup', payload);

      // Success!
      alert("Account Created Successfully! Please Login.");
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError("Registration failed. Username might already extend.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-2">Join the InfraSync Portal</p>
        </div>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm flex items-center gap-2 border border-red-200">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">I am a...</label>
            <select
              name="accountType"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none bg-slate-50 focus:bg-white transition-all"
              onChange={handleChange}
            >
              <option value="Citizen">Citizen (Public Viewer)</option>
              <option value="Water Dept">Water Dept Official</option>
              <option value="Roads Dept">Roads Dept Official</option>
              <option value="Electricity Dept">Electricity Dept Official</option>
              <option value="Gas Dept">Gas Dept Official</option>
              <option value="Telecom Dept">Telecom Dept Official</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none bg-slate-50 focus:bg-white transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none bg-slate-50 focus:bg-white transition-all"
              onChange={handleChange}
              required
            />
          </div>

          <button className="w-full bg-blue-900 text-white p-4 rounded-xl font-bold hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20 mt-2">
            Register Now
          </button>
        </form>

        <div className="mt-6 text-center text-slate-600">
          <p>Already have an account?{' '}
            <Link to="/login" className="font-bold text-blue-700 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 size={16} className="text-slate-400" />
            <span className="font-semibold">Official Ministry Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;