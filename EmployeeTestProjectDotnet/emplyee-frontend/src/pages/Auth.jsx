import React, { useState } from 'react';
import { login, register } from '../api/api';

const Auth = () => {
  const [isActive, setIsActive] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUpClick = () => setIsActive(true);
  const handleSignInClick = () => setIsActive(false);

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await login(signInData);
      if (response.data.isSuccess) {
        localStorage.setItem('token', response.data.token);
        setMessage('Login successful!');
        // Redirect or update app state here
        // alert('Login successful! Token saved.');
        window.location.href = '/employees'; // Redirect to employees page after login
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await register(signUpData);
      if (response.data.isSuccess) {
        localStorage.setItem('token', response.data.token);
        setMessage('Registration successful!');
        // Redirect or update app state here
        // alert('Registration successful! Token saved.');
        window.location.href = '/'; // Redirect to employees page after registration
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="font-['Montserrat'] flex items-center justify-center min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-4">
      <div className="relative bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-[768px] max-w-full min-h-[480px]">
        
        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out z-20 ${isActive ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
          <form className="bg-white flex flex-col items-center justify-center h-full px-10" onSubmit={handleSignInSubmit}>
            <h1 className="text-2xl font-bold">Sign In</h1>
            <div className="flex gap-2 my-5">
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-xs text-gray-700">or use your email password</span>
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={signInData.email}
              onChange={handleSignInChange}
              className="bg-gray-100 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none focus:ring-1 focus:ring-[#512da8]" 
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={signInData.password}
              onChange={handleSignInChange}
              className="bg-gray-100 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none focus:ring-1 focus:ring-[#512da8]" 
              required
            />
            <a href="#" className="text-xs text-gray-700 my-3">Forget Your Password?</a>
            {message && <p className="text-red-500 text-xs">{message}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#512da8] text-white text-xs py-2.5 px-11 rounded-lg font-semibold uppercase tracking-wide mt-2 cursor-pointer hover:bg-[#3c1c7a] transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-700 ease-in-out ${isActive ? 'translate-x-full opacity-100 z-30' : 'translate-x-0 opacity-0 z-10'}`}>
          <form className="bg-white flex flex-col items-center justify-center h-full px-10" onSubmit={handleSignUpSubmit}>
            <h1 className="text-2xl font-bold">Create Account</h1>
            <div className="flex gap-2 my-5">
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="#" className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:border-gray-500 transition">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
            <span className="text-xs text-gray-700">or use your email for registration</span>
            <input 
              type="text" 
              name="name"
              placeholder="Name" 
              value={signUpData.name}
              onChange={handleSignUpChange}
              className="bg-gray-100 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none focus:ring-1 focus:ring-[#512da8]" 
              required
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              value={signUpData.email}
              onChange={handleSignUpChange}
              className="bg-gray-100 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none focus:ring-1 focus:ring-[#512da8]" 
              required
            />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              value={signUpData.password}
              onChange={handleSignUpChange}
              className="bg-gray-100 border-none my-2 py-2 px-4 text-sm rounded-lg w-full outline-none focus:ring-1 focus:ring-[#512da8]" 
              required
            />
            {message && <p className="text-red-500 text-xs">{message}</p>}
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#512da8] text-white text-xs py-2.5 px-11 rounded-lg font-semibold uppercase tracking-wide mt-4 cursor-pointer hover:bg-[#3c1c7a] transition disabled:opacity-50"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>

        {/* Toggle Container - exactly matching original CSS behavior */}
        <div 
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-700 ease-in-out z-40
            ${isActive 
              ? '-translate-x-full rounded-tr-[150px] rounded-br-[100px] rounded-tl-none rounded-bl-none' 
              : 'translate-x-0 rounded-tl-[150px] rounded-bl-[100px] rounded-tr-none rounded-br-none'
            }`}
        >
          <div 
            className={`relative h-full w-[200%] bg-gradient-to-r from-[#5c6bc0] to-[#512da8] text-white transition-all duration-700 ease-in-out
              ${isActive ? 'left-0 translate-x-0' : '-left-full translate-x-0'}`}
            style={{ left: isActive ? '0%' : '-100%' }}
          >
            {/* Left Panel - Welcome Back (visible when isActive=true) */}
            <div 
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-700 ease-in-out
                ${isActive ? 'translate-x-0' : '-translate-x-[200%]'}`}
            >
              <h1 className="text-4xl font-bold mb-3">Welcome Back!</h1>
              <p className="text-sm leading-5 tracking-wide my-5">Enter your personal details to use all of site features</p>
              <button onClick={handleSignInClick} className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase tracking-wide mt-2 cursor-pointer hover:bg-white/10 transition">
                Sign In
              </button>
            </div>

            {/* Right Panel - Hello Friend (visible when isActive=false) */}
            <div 
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 right-0 transition-all duration-700 ease-in-out
                ${isActive ? 'translate-x-[200%]' : 'translate-x-0'}`}
            >
              <h1 className="text-4xl font-bold mb-3">Hello, Friend!</h1>
              <p className="text-sm leading-5 tracking-wide my-5">Register with your personal details to use all of site features</p>
              <button onClick={handleSignUpClick} className="bg-transparent border border-white text-white text-xs py-2 px-11 rounded-lg font-semibold uppercase tracking-wide mt-2 cursor-pointer hover:bg-white/10 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;