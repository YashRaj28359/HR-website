import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CandidatesTab = ({ candidates: globalCandidates = [], jobs = [], updateCandidateStatus }) => {
  const location = useLocation();
  const initialJob = location.state?.jobTitle || 'All Jobs';
  const [selectedJob, setSelectedJob] = useState(initialJob);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [previewResume, setPreviewResume] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('All');

  const standardJobs = ['UI/UX Designer', 'Frontend Developer', 'Content Writer', ...jobs.map(j => j.title)];
  const allJobs = ['All Jobs', ...new Set([...standardJobs, ...(initialJob !== 'All Jobs' ? [initialJob] : [])])];

  const mockCandidates = [
    { 
      id: 1, name: 'John Smith', email: 'john.smith@email.com', initials: 'JS', bg: 'bg-green-600', apps: 2, exp: '3 Years', date: 'May 24, 2025', status: 'New', statusColor: 'bg-blue-50 text-blue-600 border border-blue-100', currentCTC: '₹8,00,000', expectedCTC: '₹12,00,000',
      history: [
        { title: 'Frontend Developer', status: 'Applied', color: 'bg-blue-50 text-blue-600 border border-blue-100' },
        { title: 'UI/UX Designer', status: 'Shortlisted', color: 'bg-green-50 text-green-600 border border-green-100' }
      ]
    },
    { 
      id: 2, name: 'Alice Martin', email: 'alice.martin@email.com', initials: 'AM', bg: 'bg-blue-600', apps: 1, exp: '2 Years', date: 'May 23, 2025', status: 'Shortlisted', statusColor: 'bg-green-50 text-green-600 border border-green-100', currentCTC: '₹6,50,000', expectedCTC: '₹9,00,000',
      history: [
        { title: 'Frontend Developer', status: 'Shortlisted', color: 'bg-green-50 text-green-600 border border-green-100' }
      ]
    },
    { 
      id: 3, name: 'Robert Johnson', email: 'robert.j@email.com', initials: 'RJ', bg: 'bg-orange-500', apps: 3, exp: '5 Years', date: 'May 22, 2025', status: 'Shortlisted', statusColor: 'bg-green-50 text-green-600 border border-green-100', currentCTC: '₹15,00,000', expectedCTC: '₹20,00,000',
      history: [
        { title: 'Frontend Developer', status: 'Applied', color: 'bg-blue-50 text-blue-600 border border-blue-100' },
        { title: 'UI/UX Designer', status: 'Shortlisted', color: 'bg-green-50 text-green-600 border border-green-100' },
        { title: 'React Developer', status: 'Rejected', color: 'bg-red-50 text-red-600 border border-red-100' }
      ]
    },
    { 
      id: 4, name: 'Neha Sharma', email: 'neha.sharma@email.com', initials: 'NS', bg: 'bg-pink-500', apps: 1, exp: '1 Year', date: 'May 21, 2025', status: 'Viewed', statusColor: 'bg-orange-50 text-orange-600 border border-orange-100', currentCTC: '₹4,00,000', expectedCTC: '₹6,00,000',
      history: [
        { title: 'Content Writer', status: 'Viewed', color: 'bg-orange-50 text-orange-600 border border-orange-100' }
      ]
    },
    { 
      id: 5, name: 'Daniel Williams', email: 'daniel.w@email.com', initials: 'DW', bg: 'bg-purple-600', apps: 2, exp: '4 Years', date: 'May 20, 2025', status: 'Rejected', statusColor: 'bg-red-50 text-red-600 border border-red-100', currentCTC: '₹10,50,000', expectedCTC: '₹14,00,000',
      history: [
        { title: 'React Developer', status: 'Rejected', color: 'bg-red-50 text-red-600 border border-red-100' },
        { title: 'Frontend Developer', status: 'Viewed', color: 'bg-orange-50 text-orange-600 border border-orange-100' }
      ]
    },
  ];

  const candidates = [...globalCandidates, ...mockCandidates];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[26px] font-bold text-[#147a2e] tracking-tight uppercase">
            {selectedJob === 'All Jobs' ? 'Candidates' : selectedJob}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {selectedJob !== 'All Jobs' 
              ? `Showing candidates for ${selectedJob}` 
              : 'Browse and manage all candidates who have applied.'}
          </p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="relative">
        
        {/* Main Content Area (Table) */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        
        {/* Filters */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full sm:w-[350px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search candidates..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#29953f] focus:ring-1 focus:ring-[#29953f] transition-all placeholder-gray-400"
            />
          </div>
          
          <select 
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 outline-none focus:border-[#29953f] transition-all bg-white cursor-pointer w-[200px]"
          >
            {allJobs.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
        </div>

        {/* Candidates Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-gray-400 border-b border-gray-100">
                <th className="px-6 py-4 font-semibold pb-4">Candidate</th>
                <th className="px-6 py-4 font-semibold pb-4 text-center">Applications</th>
                <th className="px-6 py-4 font-semibold pb-4 text-center">Job Title</th>
                <th className="px-6 py-4 font-semibold pb-4">
                  <div className="flex flex-col gap-1.5 min-w-[125px]">
                    <span>Last Applied</span>
                    <div className="flex flex-col gap-1">
                      <input 
                        type="date" 
                        value={dateRange.start}
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="text-[10px] font-normal border border-gray-200 rounded px-1.5 py-1 outline-none text-gray-600 bg-white focus:border-[#29953f] transition-all w-full"
                        title="Start Date"
                      />
                      <input 
                        type="date" 
                        value={dateRange.end}
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="text-[10px] font-normal border border-gray-200 rounded px-1.5 py-1 outline-none text-gray-600 bg-white focus:border-[#29953f] transition-all w-full"
                        title="End Date"
                      />
                    </div>
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold pb-4 text-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <span>Status</span>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-[10px] font-normal border border-gray-200 rounded px-1.5 py-1 outline-none text-gray-600 bg-white focus:border-[#29953f] transition-all cursor-pointer"
                    >
                      <option value="All">All</option>
                      <option value="New">New</option>
                      <option value="Applied">Applied</option>
                      <option value="Viewed">Viewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                </th>
                <th className="px-6 py-4 font-semibold pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {candidates
                .filter(c => selectedJob === 'All Jobs' || c.history?.some(h => h.title === selectedJob))
                .filter(c => {
                  if (!dateRange.start && !dateRange.end) return true;
                  try {
                    const candDate = new Date(c.date);
                    candDate.setHours(0,0,0,0);
                    
                    if (dateRange.start) {
                      const startDate = new Date(dateRange.start);
                      startDate.setHours(0,0,0,0);
                      if (candDate < startDate) return false;
                    }
                    
                    if (dateRange.end) {
                      const endDate = new Date(dateRange.end);
                      endDate.setHours(23,59,59,999);
                      if (candDate > endDate) return false;
                    }
                    
                    return true;
                  } catch (e) {
                    return true;
                  }
                })
                .filter(c => {
                  if (statusFilter === 'All') return true;
                  let displayStatus = c.status;
                  if (selectedJob !== 'All Jobs' && c.history) {
                    const specificHistory = c.history.find(h => h.title === selectedJob);
                    if (specificHistory) {
                      displayStatus = specificHistory.status;
                    }
                  }
                  return displayStatus && displayStatus.toLowerCase() === statusFilter.toLowerCase();
                })
                .map((cand, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 ${cand.bg}`}>
                        {cand.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{cand.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{cand.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-700 text-center">{cand.apps}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-600 text-center">
                    {selectedJob !== 'All Jobs' ? selectedJob : (cand.history?.map(h => h.title).join(', ') || 'Not specified')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{cand.date}</td>
                  <td className="px-6 py-4 text-center">
                    {(() => {
                      let displayStatus = cand.status;
                      let displayColor = cand.statusColor;
                      
                      if (selectedJob !== 'All Jobs' && cand.history) {
                        const specificHistory = cand.history.find(h => h.title === selectedJob);
                        if (specificHistory) {
                          displayStatus = specificHistory.status;
                          displayColor = specificHistory.color;
                        }
                      }
                      
                      return (
                        <span className={`inline-flex items-center justify-center px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wide min-w-[100px] ${displayColor}`}>
                          {displayStatus}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => {
                          setSelectedCandidate(cand);
                          if (cand.status === 'New' || cand.status === 'Applied') {
                            updateCandidateStatus(cand.id, 'Viewed');
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
                        title="View Profile"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button 
                        onClick={() => setPreviewResume(cand)}
                        className="p-2 text-gray-400 hover:text-[#29953f] hover:bg-green-50 rounded-lg transition-colors" 
                        title="Resume"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Message">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-green-700 bg-green-50 font-bold text-sm">1</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-sm">2</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-sm">3</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        </div>

        {/* Overlapping Right Sidebar Drawer */}
        {selectedCandidate && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
              onClick={() => setSelectedCandidate(null)}
            ></div>

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-50 p-6 sm:p-8 animate-in slide-in-from-right duration-300 flex flex-col h-full border-l border-gray-100">
              
              {/* Sidebar Header (Fixed) */}
              <div className="flex justify-between items-start mb-6 shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">Candidate Profile</h3>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              
              {/* Basic Info */}
              <div className="flex flex-col items-center text-center border-b border-gray-100 pb-6">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-md ${selectedCandidate.bg}`}>
                  {selectedCandidate.initials}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selectedCandidate.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{selectedCandidate.email}</p>
                <p className="text-xs font-semibold text-gray-400 mt-1">{selectedCandidate.phone || '+91 98765 43210'} • {selectedCandidate.location || 'Bangalore, India'}</p>
                
              </div>

              {/* About */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Professional Summary</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {selectedCandidate.summary || <span className="text-gray-400 italic">No professional summary provided.</span>}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills?.length > 0 ? selectedCandidate.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-bold border border-gray-100">
                      {skill}
                    </span>
                  )) : (
                    <span className="text-gray-400 italic text-sm">No skills provided.</span>
                  )}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Work Experience</h4>
                <div className="space-y-4 ml-2">
                  {selectedCandidate.experience?.length > 0 && selectedCandidate.experience[0].companyName ? (
                    selectedCandidate.experience.map((exp, i) => (
                      <div key={i} className="mb-4">
                        <h5 className="font-bold text-gray-900 text-sm mb-2">{exp.companyName || 'Company'}</h5>
                        <div className="border-l-2 border-gray-100 ml-1.5 space-y-4 py-1">
                          {(exp.roles && exp.roles.length > 0 ? exp.roles : [{}]).map((role, rIndex) => (
                            <div key={rIndex} className="relative pl-4">
                              <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full -left-[6px] top-1.5 ring-4 ring-white"></div>
                              <h5 className="font-bold text-gray-900 text-sm">{role.jobTitle || 'Role'}</h5>
                              <p className="text-xs text-[#29953f] font-bold mb-1">{role.joiningDate || 'Date'}</p>
                              <p className="text-xs text-gray-500">{role.roleDescription || 'No description provided.'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-sm">No work experience provided.</span>
                  )}
                </div>
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Education</h4>
                <div className="space-y-4 ml-2">
                  {selectedCandidate.education?.length > 0 && (selectedCandidate.education[0].stream || selectedCandidate.education[0].educationType || selectedCandidate.education[0].course || selectedCandidate.education[0].university) ? (
                    selectedCandidate.education.map((edu, i) => (
                      <div key={i} className="relative pl-4 border-l-2 border-gray-100">
                        <div className="absolute w-2.5 h-2.5 bg-blue-400 rounded-full -left-[5px] top-1.5 ring-4 ring-white"></div>
                        <h5 className="font-bold text-gray-900 text-sm">{edu.course || edu.stream || edu.educationType || 'Degree'}</h5>
                        <p className="text-xs text-gray-500 font-bold mb-1">{edu.university || edu.school || edu.board || 'Institution'} • {edu.startYear || 'Start'} - {edu.endYear || 'End'}</p>
                        <p className="text-xs text-gray-500">Percentage: {edu.percentage || 'N/A'}</p>
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-400 italic text-sm">No education details provided.</span>
                  )}
                </div>
              </div>

              {/* Salary Expectations */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Current CTC</h4>
                  <p className="font-semibold text-gray-800 text-sm">{selectedCandidate.currentCTC}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Expected CTC</h4>
                  <p className="font-semibold text-gray-800 text-sm">{selectedCandidate.expectedCTC}</p>
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Applied On</h4>
                  <p className="font-semibold text-gray-800 text-sm">{selectedCandidate.date}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Resume</h4>
                  <button className="flex items-center gap-1.5 text-sm font-bold text-[#29953f] hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    Download
                  </button>
                </div>
              </div>

              {/* Cover Letter */}
              {selectedCandidate.coverLetter && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Cover Letter</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 leading-relaxed border border-gray-100 whitespace-pre-wrap">
                    {selectedCandidate.coverLetter}
                  </div>
                </div>
              )}

              {/* Application History */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Application History</h4>
                <div className="space-y-3">
                  {selectedCandidate.history?.map((hist, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50/80 p-3 rounded-lg border border-gray-100">
                      <p className="font-bold text-gray-800 text-sm">{hist.title}</p>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide min-w-[80px] ${hist.color}`}>
                          {hist.status}
                        </span>
                        <select 
                          className="px-2 py-1 border border-gray-200 rounded text-xs font-bold text-gray-600 outline-none focus:border-[#29953f] transition-all bg-white cursor-pointer"
                          value={['Shortlisted', 'Rejected'].includes(hist.status) ? hist.status : ""}
                          onChange={(e) => {
                            const newStatus = e.target.value;
                            let color = 'bg-blue-50 text-blue-600 border border-blue-100';
                            if (newStatus.toLowerCase() === 'shortlisted') color = 'bg-green-50 text-green-600 border border-green-100';
                            else if (newStatus.toLowerCase() === 'rejected') color = 'bg-red-50 text-red-600 border border-red-100';
                            
                            const newHistory = selectedCandidate.history.map((h, index) => 
                              index === i ? { ...h, status: newStatus, color } : h
                            );
                            
                            if (updateCandidateStatus) {
                              updateCandidateStatus(selectedCandidate.id, newStatus, hist.title);
                            }
                            
                            setSelectedCandidate({
                              ...selectedCandidate,
                              history: newHistory,
                              status: newStatus, // Update top badge as well
                              statusColor: color
                            });
                          }}
                        >
                          <option value="" disabled>Update</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Footer Actions (Fixed) */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3 shrink-0">
              <button className="w-full py-3 bg-[#29953f] hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm">
                Message Candidate
              </button>
            </div>

            </div>
          </>
        )}

      </div>

        {/* Resume Preview Modal */}
        {previewResume && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-900">{previewResume.name} - Resume</h3>
                <button onClick={() => setPreviewResume(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-1 bg-gray-200 p-4 sm:p-8 overflow-y-auto">
                <div className="bg-white max-w-3xl mx-auto shadow-sm min-h-full p-8 sm:p-12 font-sans text-gray-800">
                  <div className="border-b-2 border-gray-800 pb-6 mb-6">
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">{previewResume.name}</h1>
                    <p className="text-gray-600 mt-2">{previewResume.email} • {previewResume.phone || '+91 98765 43210'} • {previewResume.location || 'Bangalore, India'}</p>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">Professional Summary</h2>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {previewResume.summary || "Results-driven professional with a proven track record of delivering high-quality work. Experienced in leading teams and managing complex projects from conception to completion. Adept at problem-solving and optimizing processes to achieve organizational goals."}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">Experience</h2>
                    <div className="space-y-6">
                      {previewResume.experience ? previewResume.experience.map((exp, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">{exp.company}</h3>
                            <span className="text-sm font-semibold text-gray-500">{exp.duration}</span>
                          </div>
                          {exp.roles && exp.roles.length > 0 ? exp.roles.map((role, r) => (
                            <div key={r} className="mb-3">
                              <p className="text-sm font-semibold text-gray-700 italic">{role.title}</p>
                              <p className="text-sm text-gray-600 mt-1">{role.description || "Led key initiatives and managed cross-functional teams to deliver impactful solutions."}</p>
                            </div>
                          )) : (
                            <div className="mb-3">
                              <p className="text-sm font-semibold text-gray-700 italic">{previewResume.role || previewResume.exp || 'Professional'}</p>
                              <p className="text-sm text-gray-600 mt-1">Successfully executed core responsibilities and exceeded performance targets.</p>
                            </div>
                          )}
                        </div>
                      )) : (
                        <div>
                          <div className="flex justify-between items-baseline mb-1">
                            <h3 className="font-bold text-gray-900">Tech Solutions Inc.</h3>
                            <span className="text-sm font-semibold text-gray-500">2020 - Present</span>
                          </div>
                          <p className="text-sm font-semibold text-gray-700 italic">{previewResume.exp || 'Senior Developer'}</p>
                          <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                            <li>Spearheaded the development of a scalable architecture.</li>
                            <li>Mentored junior team members and established best practices for code quality.</li>
                            <li>Collaborated with product managers to define technical roadmaps.</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider mb-3">Education</h2>
                    <div className="space-y-4">
                      {previewResume.education ? previewResume.education.map((edu, i) => (
                        <div key={i} className="flex justify-between items-baseline">
                          <div>
                            <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                            <p className="text-sm text-gray-600">{edu.institution}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-500">{edu.year}</span>
                        </div>
                      )) : (
                        <div className="flex justify-between items-baseline">
                          <div>
                            <h3 className="font-bold text-gray-900">Bachelor's Degree</h3>
                            <p className="text-sm text-gray-600">National Institute of Technology</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-500">2016 - 2020</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default CandidatesTab;
