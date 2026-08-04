import React from 'react';
import { Link } from 'react-router-dom';

const ManageJobs = () => {
  const jobs = [
    { id: 1, title: 'UI/UX Designer', type: 'Full-time • Remote', apps: 45, status: 'Active', statusColor: 'bg-green-100 text-green-700', dateText: 'Posted on', date: 'May 20, 2025', iconColor: 'text-green-500 bg-green-50' },
    { id: 2, title: 'Frontend Developer', type: 'Full-time • Hybrid', apps: 62, status: 'Active', statusColor: 'bg-green-100 text-green-700', dateText: 'Posted on', date: 'May 18, 2025', iconColor: 'text-green-500 bg-green-50' },
    { id: 3, title: 'Content Writer', type: 'Part-time • Remote', apps: 17, status: 'Closing Soon', statusColor: 'bg-orange-100 text-orange-700', dateText: 'Posted on', date: 'May 10, 2025', iconColor: 'text-orange-500 bg-orange-50' },
    { id: 4, title: 'Marketing Executive', type: 'Full-time • On-site', apps: 0, status: 'Draft', statusColor: 'bg-blue-100 text-blue-700', dateText: 'Last edited', date: 'May 25, 2025', iconColor: 'text-blue-500 bg-blue-50' },
    { id: 5, title: 'Graphic Designer', type: 'Full-time • Remote', apps: 28, status: 'Closed', statusColor: 'bg-gray-100 text-gray-700', dateText: 'Closed on', date: 'May 05, 2025', iconColor: 'text-gray-500 bg-gray-50' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[26px] font-bold text-[#147a2e] tracking-tight">MY JOBS</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and track all your job postings.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/employer/post-job"
            className="px-5 py-2.5 bg-[#29953f] hover:bg-green-700 text-white text-sm font-bold rounded-full transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="text-lg leading-none">+</span> Post New Job
          </Link>
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-green-700 shadow-sm cursor-pointer">
            C
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6">
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-[350px]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input 
              type="text" 
              placeholder="Search jobs by title..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#29953f] focus:ring-1 focus:ring-[#29953f] transition-all placeholder-gray-400"
            />
          </div>
          
          <select className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 outline-none focus:border-[#29953f] transition-all bg-white cursor-pointer">
            <option>All Status</option>
            <option>Active</option>
            <option>Closing Soon</option>
            <option>Draft</option>
            <option>Closed</option>
          </select>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition-all gap-4">
              
              {/* Job Info */}
              <div className="flex items-center gap-4 w-full sm:w-[30%]">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-current opacity-80 ${job.iconColor}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{job.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{job.type}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-row items-center justify-between w-full sm:w-[70%]">
                
                <div className="text-center w-1/4">
                  <h4 className="font-bold text-gray-900 text-sm">{job.apps}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mt-0.5">Applications</p>
                </div>

                <div className="text-center w-1/4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${job.statusColor}`}>
                    {job.status}
                  </span>
                </div>

                <div className="text-center w-1/4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">{job.dateText}</p>
                  <p className="font-bold text-gray-900 text-xs mt-0.5">{job.date}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1 w-1/4 shrink-0">
                  <button className="p-2 text-gray-400 hover:text-[#29953f] hover:bg-green-50 rounded-lg transition-colors" title="View Candidates">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </button>
                  <button className="hidden lg:flex p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Job Info">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="More">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-green-700 bg-green-50 font-bold text-sm">1</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-sm">2</button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>

    </div>
  );
};

export default ManageJobs;
