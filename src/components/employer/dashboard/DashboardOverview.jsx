import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardOverview = ({ jobs = [], toggleJobStatus }) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const chartData = [
    { name: 'Mon', apps: 12 },
    { name: 'Tue', apps: 22 },
    { name: 'Wed', apps: 25 },
    { name: 'Thu', apps: 38 },
    { name: 'Fri', apps: 32 },
    { name: 'Sat', apps: 25 },
    { name: 'Sun', apps: 15 },
  ];

  const stats = [
    { label: 'Active Jobs', value: '3', trend: '2 closing soon', trendColor: 'text-gray-500', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#147a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    )},
    { label: 'Total Applications', value: '124', trend: '+12 this week', trendColor: 'text-green-600', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#147a2e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    )},
    { label: 'Total Candidates', value: '98', trend: '+8 this week', trendColor: 'text-green-600', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    )},
    { label: 'Shortlisted', value: '24', trend: '+5 this week', trendColor: 'text-green-600', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
    )}
  ];

  const recentJobs = jobs.slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-[26px] font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Welcome back, Recruiter! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's what's happening with your job postings today.</p>
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

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100 shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</h3>
              <p className={`text-[10px] font-bold mt-1 ${stat.trendColor}`}>{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Layout */}
      <div className="pt-2">
        {/* My Jobs Overview */}
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">My Jobs Overview</h2>
            <Link to="/employer/manage-jobs" className="text-xs font-bold text-[#29953f] hover:underline">
              View All Jobs
            </Link>
          </div>
          
          <div className="p-0 overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400 border-b border-gray-50">
                  <th className="px-6 py-3 font-semibold pb-4">Job Title</th>
                  <th className="px-4 py-3 font-semibold pb-4">Applications</th>
                  <th className="px-4 py-3 font-semibold pb-4">Status</th>
                  <th className="px-4 py-3 font-semibold pb-4">Created</th>
                  <th className="px-4 py-3 font-semibold pb-4 text-center">View Details</th>
                  <th className="px-4 py-3 font-semibold pb-4 text-center">View Candidate</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentJobs.map((job, idx) => (
                  <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{job.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{job.details?.employmentType} • {job.details?.workLocation}</div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-gray-700">
                      {job.applications !== undefined ? job.applications : Math.floor(Math.random() * 50) + 1}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${job.status === 'Closed' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-500 font-medium">
                      {job.postedAt}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="text-[#29953f] hover:text-green-700 font-bold text-xs"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link to="/employer/candidates" state={{ jobTitle: job.title }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center justify-center" title="View Candidates">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={job.status === 'Closed' ? 'close' : 'active'}
                        onChange={() => toggleJobStatus && toggleJobStatus(job.id)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 outline-none focus:border-[#29953f] transition-all bg-white cursor-pointer ml-auto"
                      >
                        <option value="active">Active</option>
                        <option value="close">Close</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Overlapping Right Sidebar Drawer for Job Details */}
      {selectedJob && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setSelectedJob(null)}
          ></div>

          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-50 p-6 sm:p-8 animate-in slide-in-from-right duration-300 flex flex-col h-full border-l border-gray-100">
            
            {/* Sidebar Header (Fixed) */}
            <div className="flex justify-between items-start mb-6 shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">Job Details</h3>
              <button 
                onClick={() => setSelectedJob(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
              
              {/* Basic Info */}
              <div className="border-b border-gray-100 pb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">
                    {selectedJob.type}
                  </span>
                  <span className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${selectedJob.statusColor}`}>
                    {selectedJob.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Total Applicants</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{selectedJob.apps}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Posted On</p>
                    <p className="text-sm font-bold text-gray-900 mt-2">{selectedJob.date}</p>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Job Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We are looking for a highly skilled and motivated professional to join our team. 
                  The ideal candidate will have strong experience in their respective field and a passion for building great products. 
                  You will work closely with cross-functional teams to deliver high-quality solutions.
                </p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Requirements</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                  <li>3+ years of relevant experience.</li>
                  <li>Strong problem-solving and analytical skills.</li>
                  <li>Excellent communication and teamwork abilities.</li>
                  <li>Familiarity with modern tools and frameworks.</li>
                  <li>Ability to work in a fast-paced environment.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar Footer Actions (Fixed) */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3 shrink-0">
              <Link 
                to="/employer/candidates" 
                state={{ jobTitle: selectedJob.title }}
                className="w-full py-3 bg-[#29953f] hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm text-center"
              >
                View Candidates
              </Link>
            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default DashboardOverview;
