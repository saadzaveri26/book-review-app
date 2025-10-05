import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left Side */}
        <div className="relative w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop"
            alt="A library with a collection of books"
            className="w-full h-full object-cover rounded-l-2xl hidden md:block"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
          <span className="mb-3 text-4xl font-bold">Welcome Back</span>
          <span className="font-light text-gray-400 mb-8">
            Please enter your details to log in
          </span>

          <form onSubmit={handleSubmit}>
            {error && <p className="bg-red-100 text-red-600 p-3 mb-4 rounded-md text-sm">{error}</p>}
            
            <div className="py-4">
              <span className="mb-2 text-md">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                required
              />
            </div>
            
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500" 
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-2 rounded-lg mt-6 hover:bg-white hover:text-black hover:border hover:border-gray-300 disabled:bg-gray-400"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center text-gray-400 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-black hover:underline">
              Sign up for free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;