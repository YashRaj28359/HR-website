import React from 'react';
import { Link } from 'react-router-dom';

const ManageJobs = ({ jobs = [], toggleJobStatus }) => {

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
          {jobs.map(job => {
            const isClosed = job.status === 'Closed';
            const statusColor = job.statusColor || (isClosed ? 'bg-gray-100 text-gray-700' : 'bg-green-100 text-green-700');
            const displayStatus = job.status || 'Active';
            const iconColor = job.iconColor || 'text-green-500 bg-green-50';
            const jobType = job.type || `${job.details?.employmentType || 'Full-time'} • ${job.details?.workLocation || 'Remote'}`;
            const appsCount = job.applications || 0;
            const postedDate = job.date || job.postedAt || 'Recently';

            return (
              <div key={job.id} className={`flex flex-col sm:flex-row items-center justify-between p-5 rounded-xl border transition-all gap-4 ${isClosed ? 'border-gray-100 bg-gray-50/50 opacity-75' : 'border-gray-100 hover:border-green-200 hover:shadow-sm'}`}>
                
                {/* Job Info */}
                <div className="flex items-center gap-4 w-full sm:w-[30%]">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 border border-current opacity-80 ${iconColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{job.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{jobType}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-row items-center justify-between w-full sm:w-[70%]">
                  
                  <div className="text-center w-1/4">
                    <h4 className="font-bold text-gray-900 text-sm">{appsCount}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold mt-0.5">Applications</p>
                  </div>

                  <div className="text-center w-1/4">
                    <button onClick={() => toggleJobStatus && toggleJobStatus(job.id)} className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity ${statusColor}`}>
                      {displayStatus}
                    </button>
                  </div>

                  <div className="text-center w-1/4">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide font-bold">{isClosed ? 'Closed on' : 'Posted on'}</p>
                    <p className="font-bold text-gray-900 text-xs mt-0.5">{postedDate}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1 w-1/4 shrink-0">
                    <button className="p-2 text-gray-400 hover:text-[#29953f] hover:bg-green-50 rounded-lg transition-colors" title="View Candidates">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </button>
                    <button className="hidden lg:flex p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title="Job Info">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <button onClick={() => toggleJobStatus && toggleJobStatus(job.id)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors" title={isClosed ? 'Reopen Job' : 'Close Job'}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isClosed ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
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
