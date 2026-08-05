import React, { useState } from 'react';
import LocationAutocomplete from '../common/LocationAutocomplete';const EmployerRegisterModal = ({ isOpen, onClose, onLoginClick, onLoginSuccess }) => {
  const [step, setStep] = useState(1);
  
  // Step 1 state
  const [mobile, setMobile] = useState('');
  const [termsChecked, setTermsChecked] = useState(true);

  // Step 2 state
  const [accountType, setAccountType] = useState('company'); // 'company' or 'individual'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3 state
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [employees, setEmployees] = useState('');
  const [designation, setDesignation] = useState('');
  
  // Location
  const [location, setLocation] = useState('');

  const [aboutCompany, setAboutCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [hiringFor, setHiringFor] = useState('your_company');

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (mobile.length >= 10 && termsChecked) {
      setStep(2);
    }
  };

  const handleBasicDetailsSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalRegister = (e) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8fbff] overflow-y-auto">
      
      {/* Close Button (fixed to top right of screen) */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10 bg-white rounded-full p-2 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="min-h-screen px-4 py-10 flex flex-col items-center justify-center">
        {/* Stepper Header (Only for Step 2 and 3 ) */}
        {step >= 2 && step <= 3 && (
          <div className="flex items-center justify-center gap-3 mb-8 w-full max-w-lg">
          <div className="flex items-center gap-1.5">
            <div className={`w-3.5 h-3.5 rounded-full ${step >= 2 ? 'bg-palette-400 ring-2 ring-palette-100' : 'bg-gray-200'}`}></div>
            <span className={`text-sm ${step >= 2 ? 'font-semibold text-palette-900' : 'font-medium text-gray-400'}`}>Basic details</span>
          </div>
          <div className={`h-px w-12 ${step >= 3 ? 'bg-palette-400' : 'bg-gray-300'}`}></div>
          <div className="flex items-center gap-1.5">
            <div className={`w-3.5 h-3.5 rounded-full ${step >= 3 ? 'bg-palette-400 ring-2 ring-palette-100' : 'bg-gray-200'}`}></div>
            <span className={`text-sm ${step >= 3 ? 'font-semibold text-palette-900' : 'font-medium text-gray-400'}`}>Company details</span>
          </div>
        </div>
      )}

      {/* Form Card */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl animate-in fade-in zoom-in duration-200">
        <div className="p-8">
          
          {/* STEP 1 */}
          {step === 1 && (
            <>
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Continue with mobile</h2>
              </div>

              {/* Form */}
              <div className="space-y-6">
                
                {/* Mobile Number Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Mobile number
                  </label>
                  <div className="flex items-center px-5 py-3.5 rounded-full border border-gray-300 focus-within:border-palette-400 focus-within:ring-1 focus-within:ring-palette-400 transition-all bg-white">
                    <span className="text-gray-900 font-semibold mr-1.5 whitespace-nowrap shrink-0 flex items-center gap-1">
                      +91 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-0.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-transparent border-none outline-none placeholder-gray-400 text-gray-900 min-w-0"
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={termsChecked}
                      onChange={(e) => setTermsChecked(e.target.checked)}
                      className="mt-1 w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500 accent-green-600"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>
                    </span>
                  </label>
                </div>

                {/* Send OTP Button */}
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={handleSendOtp}
                    disabled={mobile.length < 10 || !termsChecked}
                    className={`w-full py-3.5 font-bold rounded-full transition-all duration-300 ${
                      mobile.length >= 10 && termsChecked
                        ? 'bg-palette-400 hover:bg-palette-900 text-white shadow-lg shadow-palette-400/40 hover:shadow-palette-900/30 transform hover:-translate-y-0.5' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
              
              {/* Login instead link */}
              {onLoginClick && (
                <div className="mt-6 text-center">
                  <button onClick={onLoginClick} className="text-sm text-palette-900 font-semibold hover:text-palette-400 transition-colors">
                    Already have an account? Login
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              {/* Sub-header info */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-10 h-10 bg-palette-50 text-palette-400 rounded-xl flex items-center justify-center mb-3 border border-palette-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                  We need these details to identify you and create your account
                </p>
              </div>

              {/* Display Mobile */}
              <div className="mb-5 flex items-center gap-2">
                 <span className="text-sm font-semibold text-gray-900">
                   Mobile: +91 {mobile}
                 </span>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleBasicDetailsSubmit}>
                
                {/* Account Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    You're creating account as
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="accountType" 
                        value="company"
                        checked={accountType === 'company'}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">Company/business</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="accountType" 
                        value="individual"
                        checked={accountType === 'individual'}
                        onChange={(e) => setAccountType(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">Individual/proprietor</span>
                    </label>
                  </div>
                </div>

                {/* Full Name Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Full name
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Name as per PAN"
                    className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Official email ID
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email ID"
                    className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Create password
                  </label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400"
                  />
                </div>

                {/* Re-enter Password Input */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">
                    Re-enter password
                  </label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400"
                  />
                </div>

                {/* Register Button */}
                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-palette-400 hover:bg-palette-900 text-white font-bold rounded-full shadow-lg shadow-palette-400/40 hover:shadow-palette-900/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              {/* Sub-header info */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-10 h-10 bg-palette-50 text-palette-400 rounded-xl flex items-center justify-center mb-3 border border-palette-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                  Tell us about your company to complete registration
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleFinalRegister}>
                
                {/* Hiring For */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-900">
                    Hiring for
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="hiringFor" 
                        value="your_company"
                        checked={hiringFor === 'your_company'}
                        onChange={(e) => setHiringFor(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">Your company</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="hiringFor" 
                        value="consultant"
                        checked={hiringFor === 'consultant'}
                        onChange={(e) => setHiringFor(e.target.value)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 accent-green-600"
                      />
                      <span className="text-sm text-gray-700">Consultant</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Enter Company Name</label>
                  <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Select industry</label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all text-gray-700 bg-white">
                    <option value="" disabled>Select industry</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Number of Employees</label>
                  <select value={employees} onChange={(e) => setEmployees(e.target.value)} className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all text-gray-700 bg-white">
                    <option value="" disabled>Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Your designation</label>
                  <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} placeholder="e.g. HR Manager" className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400" />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Company Location</label>
                  <LocationAutocomplete 
                    value={location}
                    onChange={setLocation}
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">About Company</label>
                  <textarea value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} placeholder="Briefly describe your company..." rows="3" className="w-full px-5 py-3.5 rounded-2xl border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400 resize-none"></textarea>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-gray-900">Website link (Optional)</label>
                  <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://www.example.com" className="w-full px-5 py-3.5 rounded-full border border-gray-300 focus:border-palette-400 focus:ring-1 focus:ring-palette-400 outline-none transition-all placeholder-gray-400" />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full py-3.5 bg-palette-400 hover:bg-palette-900 text-white font-bold rounded-full shadow-lg shadow-palette-400/40 hover:shadow-palette-900/30 transition-all duration-300 transform hover:-translate-y-0.5">
                    Continue
                  </button>
                </div>
              </form>
            </>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Congratulations</h2>
              <p className="text-gray-600 mb-10 max-w-[300px] leading-relaxed">
                Your recruiter account has been successfully created!
              </p>
              <button 
                onClick={() => onLoginSuccess?.()}
                className="w-full py-3.5 bg-palette-400 hover:bg-palette-900 text-white font-bold rounded-full shadow-lg shadow-palette-400/40 hover:shadow-palette-900/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Continue
              </button>
            </div>
          )}

        </div>
      </div>
      </div>
    </div>
  );
};

export default EmployerRegisterModal;
