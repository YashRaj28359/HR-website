import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyJobs } from '../../data/dummyJobs';
import JobApplicationModal from './JobApplicationModal';

const EmployeeHomepage = () => {
  const [selectedJobId, setSelectedJobId] = useState(dummyJobs[0].id);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('savedJobs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleSaveJob = (jobId, e) => {
    if (e) e.stopPropagation();
    setSavedJobs(prev => {
      const newSaved = prev.includes(jobId) 
        ? prev.filter(id => id !== jobId) 
        : [...prev, jobId];
      localStorage.setItem('savedJobs', JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const selectedJob = dummyJobs.find(j => j.id === selectedJobId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo / Brand (Optional placeholder to balance layout) */}
          <div className="text-xl font-black text-palette-900 w-48">
            DreamJob
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl flex items-center bg-gray-100 rounded-full px-2 py-1.5 focus-within:ring-2 focus-within:ring-palette-400 focus-within:bg-white transition-all">
            <div className="flex-1 flex items-center px-3 border-r border-gray-300">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Find your perfect job" 
                className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500"
              />
            </div>
            <div className="flex-1 flex items-center px-3">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="City, county, region or remote" 
                className="w-full bg-transparent border-none outline-none text-sm text-gray-900 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-6 w-auto">
            {/* My Jobs (Bookmark) */}
            <button onClick={() => navigate('/my-jobs')} className="text-gray-700 hover:text-black transition-colors" title="My jobs">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
              </svg>
            </button>

            {/* Notifications (Bell) */}
            <button className="text-gray-700 hover:text-black transition-colors relative" title="Notifications">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Profile Dropdown Toggle */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-gray-700 hover:text-black transition-colors flex items-center justify-center focus:outline-none"
                title="Account"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  <div className="p-5 border-b border-gray-200">
                    <p className="text-base font-bold text-gray-900 truncate">yashrajsingh28359@gmail.com</p>
                  </div>
                  
                  <div className="py-2 border-b border-gray-200">
                    <button 
                      onClick={() => navigate('/profile')}
                      className="w-full text-left px-5 py-3 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                      </svg>
                      <span className="text-[15px] text-gray-800">Profile</span>
                    </button>
                  </div>

                  <div className="p-4 border-b border-gray-200 flex justify-center text-xs text-gray-600">
                    <p>
                      © 2026 Indeed - <span className="hover:underline cursor-pointer">Terms</span> - <span className="hover:underline cursor-pointer">Accessibility at Indeed</span>
                    </p>
                  </div>

                  <div className="py-2">
                    <button 
                      onClick={() => navigate('/')}
                      className="w-full text-center py-2 text-[15px] font-bold text-blue-700 hover:underline transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
        </div>

      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex gap-6 items-start h-[calc(100vh-125px)]">
        
        {/* Left Column (Job List) */}
        <div className="w-[400px] flex-shrink-0 flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
          {dummyJobs.map(job => (
            <div 
              key={job.id} 
              onClick={() => setSelectedJobId(job.id)}
              className={`p-4 bg-white border rounded-xl cursor-pointer transition-all ${
                selectedJobId === job.id ? 'border-green-600 shadow-md' : 'border-gray-200 hover:shadow-sm hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded font-bold text-gray-600 flex items-center justify-center text-xs">
                    {job.companyInitial}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                      {job.company} {job.rating && <span className="text-xs text-gray-500">{job.rating}★</span>}
                    </h4>
                    <h3 className="text-base font-bold text-gray-900 leading-snug mt-0.5">{job.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{job.location} • {job.details.workLocation}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-0.5">
                      {job.salary} {job.employerProvided && <span className="text-gray-500 font-normal">(Employer provided)</span>}
                    </p>
                    {job.easyApply && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsApplicationModalOpen(true); }}
                        className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded text-xs font-bold transition-colors"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                        Apply
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full min-h-[80px]">
                  <button 
                    onClick={(e) => toggleSaveJob(job.id, e)} 
                    className={`transition-colors ${savedJobs.includes(job.id) ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {savedJobs.includes(job.id) ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                    )}
                  </button>
                  <span className="text-xs text-gray-400 font-medium">{job.postedAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column (Job Details) */}
        {selectedJob && (
          <div className="flex-1 bg-white border border-gray-200 rounded-xl h-full overflow-y-auto custom-scrollbar relative">
            
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded font-bold text-gray-600 flex items-center justify-center text-lg">
                    {selectedJob.companyInitial}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{selectedJob.company}</h2>
                  </div>
                </div>
                <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                </button>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedJob.title}</h1>
              
              <div className="flex items-center gap-3 mb-6 text-sm">
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-medium">{selectedJob.location}</span>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{selectedJob.details.workLocation}</span>
                <span className="text-gray-900 font-semibold">
                  {selectedJob.salary} {selectedJob.employerProvided && <span className="text-gray-500 font-normal">(Employer provided)</span>}
                </span>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                  Apply
                </button>
                <button 
                  onClick={() => toggleSaveJob(selectedJobId)}
                  className={`px-3 py-2.5 border rounded-lg transition-colors ${savedJobs.includes(selectedJobId) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                >
                  {savedJobs.includes(selectedJobId) ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Your qualifications for this job</h3>
              </div>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {selectedJob.qualifications.map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    {q.met ? (
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    )}
                    {q.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4 text-sm text-gray-800 leading-relaxed">
                <p><strong>Job Title:</strong> {selectedJob.details.jobTitle}</p>
                <p><strong>Employment Type:</strong> {selectedJob.details.employmentType}</p>
                <p><strong>Experience:</strong> {selectedJob.details.experience}</p>
                <p><strong>About Role:</strong> {selectedJob.details.aboutRole}</p>
                <p><strong>Responsibilities:</strong> {selectedJob.details.responsibilities}</p>
                <p><strong>Skills Required:</strong> {selectedJob.details.skillsRequired}</p>
                <p><strong>Salary:</strong> {selectedJob.details.salary}</p>
                <p><strong>Qualification:</strong> {selectedJob.details.qualification}</p>
                <p><strong>Stream:</strong> {selectedJob.details.stream}</p>
                <p><strong>Job Category:</strong> {selectedJob.details.jobCategory}</p>
              </div>
            </div>

          </div>
        )}
      </main>

      <JobApplicationModal 
        isOpen={isApplicationModalOpen} 
        onClose={() => setIsApplicationModalOpen(false)} 
        job={selectedJob} 
      />
    </div>
  );
};

export default EmployeeHomepage;
