import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import EmployeeHomepage from './components/employee/EmployeeHomepage';
import EmployeeLoginModal from './components/employee/EmployeeLoginModal';
import EmployeeRegisterModal from './components/employee/EmployeeRegisterModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEmployeeLoginOpen, setIsEmployeeLoginOpen] = useState(false);
  const [isEmployeeRegisterOpen, setIsEmployeeRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const openRegister = () => {
    setIsEmployeeLoginOpen(false);
    setIsEmployeeRegisterOpen(true);
  };

  const openLogin = () => {
    setIsEmployeeRegisterOpen(false);
    setIsEmployeeLoginOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsEmployeeLoginOpen(false);
    setIsEmployeeRegisterOpen(false);
    navigate('/employee');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white font-sans text-palette-900 flex flex-col selection:bg-palette-200 selection:text-palette-900">
            {/* Navbar */}
      <nav className="w-full px-8 py-6 flex justify-end items-center gap-4 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-palette-100 shadow-sm">
        <button 
          onClick={() => setIsEmployeeLoginOpen(true)}
          className="px-6 py-2.5 rounded-full font-medium text-palette-900 hover:text-white hover:bg-palette-400 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-palette-200 focus:outline-none focus:ring-2 focus:ring-palette-400 focus:ring-offset-2"
        >
          Employee Login
        </button>
        <button 
          className="px-6 py-2.5 rounded-full font-medium bg-palette-900 text-white hover:bg-palette-400 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-palette-200 focus:outline-none focus:ring-2 focus:ring-palette-900 focus:ring-offset-2"
        >
          Employer Login
        </button>
      </nav>

      {/* Main Body */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-palette-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-palette-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-palette-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center space-y-12">
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-roboto font-black tracking-tight text-palette-900">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-palette-400 to-palette-900">Dream Job</span>
            </h1>
            <p className="text-xl text-palette-900/70 font-medium max-w-2xl mx-auto">
              Discover opportunities that align with your passion and expertise.
            </p>
          </div>

          <div className="w-full max-w-3xl bg-white p-3 rounded-full shadow-2xl shadow-palette-200/50 flex flex-col md:flex-row items-center gap-3 border border-palette-100 transition-all duration-500 focus-within:ring-4 focus-within:ring-palette-100 focus-within:border-palette-200 focus-within:shadow-palette-400/30">
            <div className="flex-1 w-full flex items-center px-6 py-3 bg-palette-100/30 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-palette-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Job title, keywords, or company..." 
                className="w-full bg-transparent border-none outline-none px-4 text-palette-900 placeholder-palette-900/40 text-lg font-medium"
              />
            </div>
            
            <button className="w-full md:w-auto px-10 py-4 bg-palette-400 text-white rounded-full font-bold text-lg shadow-lg shadow-palette-400/40 hover:bg-palette-900 hover:shadow-xl hover:shadow-palette-900/30 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-palette-400 focus:ring-offset-2 flex items-center justify-center gap-2 group">
              Search Jobs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </main>
          </div>
        } />
        
        <Route 
          path="/employee" 
          element={isLoggedIn ? <EmployeeHomepage /> : <Navigate to="/" />} 
        />
      </Routes>

      <EmployeeLoginModal 
        isOpen={isEmployeeLoginOpen} 
        onClose={() => setIsEmployeeLoginOpen(false)} 
        onRegisterClick={openRegister}
        onLoginSuccess={handleLoginSuccess}
      />
      <EmployeeRegisterModal 
        isOpen={isEmployeeRegisterOpen}
        onClose={() => setIsEmployeeRegisterOpen(false)}
        onLoginClick={openLogin}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}

export default App
