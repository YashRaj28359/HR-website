import React, { useState } from 'react';

const EmployeeLoginModal = ({ isOpen, onClose, onRegisterClick, onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' | 'otp'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

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
            <h2 className="text-2xl font-bold text-palette-900">Employee Login</h2>
            {onRegisterClick && (
              <button 
                onClick={onRegisterClick}
                className="text-palette-400 font-semibold hover:text-palette-900 transition-colors"
              >
                Register for free
              </button>
            )}
          </div>

          {loginMethod === 'email' ? (
            <>
              {/* Form */}
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); }}>
                
                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Email ID</label>
                  <input 
                    type="text" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your active Email ID"
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

              {/* OTP Login Link */}
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setLoginMethod('otp')}
                  className="text-palette-400 font-bold hover:text-palette-900 transition-colors"
                >
                  Use OTP to Login
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Form */}
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); }}>
                
                {/* Mobile Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Mobile Number</label>
                  <div className="flex items-center px-5 py-3.5 rounded-full border border-gray-300 focus-within:border-palette-400 focus-within:ring-1 focus-within:ring-palette-400 transition-all bg-white">
                    <span className="text-gray-900 font-semibold mr-1.5 whitespace-nowrap shrink-0">+91 -</span>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your 10 digit mobile number"
                      className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 min-w-0"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">You will receive an OTP on this number</p>
                </div>

                {/* Get OTP Button */}
                <button 
                  type="button"
                  onClick={() => onLoginSuccess?.()}
                  className={`w-full py-3.5 text-white font-bold rounded-full transition-all duration-300 ${
                    mobile.length >= 10 
                      ? 'bg-palette-900 hover:bg-palette-400 shadow-lg shadow-palette-900/30 hover:shadow-palette-400/40 transform hover:-translate-y-0.5' 
                      : 'bg-palette-200 cursor-not-allowed'
                  }`}
                  disabled={mobile.length < 10}
                >
                  Get OTP
                </button>
              </form>

              {/* Email Login Link */}
              <div className="mt-6 text-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px bg-gray-200 flex-1"></div>
                  <span className="text-sm text-gray-400 font-medium">Or</span>
                  <div className="h-px bg-gray-200 flex-1"></div>
                </div>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className="w-full py-3 border border-palette-400 text-palette-400 font-semibold rounded-full hover:bg-palette-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-palette-400 focus:ring-offset-2"
                >
                  Use Email to Login
                </button>
              </div>
            </>
          )}

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400 font-medium">Or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Google Sign In */}
          <button onClick={() => onLoginSuccess?.()} className="w-full py-3 flex items-center justify-center gap-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-semibold text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginModal;
