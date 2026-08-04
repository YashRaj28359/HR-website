import React, { useState } from 'react';

const EmployerLoginModal = ({ isOpen, onClose, onRegisterClick, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-palette-900">Employer Login</h2>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); }}>
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-900">Email ID</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered Email ID"
                className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-900">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  className="w-full px-5 py-3.5 rounded-full border border-gray-300 bg-gray-50 focus:bg-white focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all tracking-widest placeholder-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-palette-400 hover:text-palette-900 transition-colors tracking-normal"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <a href="#" className="text-sm font-semibold text-palette-400 hover:text-palette-900 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              className="w-full py-3.5 bg-palette-900 hover:bg-palette-400 text-white font-bold rounded-full shadow-lg shadow-palette-900/30 hover:shadow-palette-400/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          {onRegisterClick && (
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account?{' '}
                <button 
                  onClick={onRegisterClick}
                  className="text-palette-900 font-bold hover:text-palette-400 transition-colors"
                >
                  Create account
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EmployerLoginModal;
