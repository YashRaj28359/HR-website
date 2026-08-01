import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Yash Raj',
    lastName: 'Singh',
    phone: '9399886418',
    email: 'sonic16t@gmail.com',
    qualifications: [],
    isFresher: true,
    experience: [],
    professionalDetails: {
      currentDesignation: '',
      currentSalary: '',
      expectedSalary: '',
      currentLocation: 'Pune, INDIA',
      preferredLocations: '',
      linkedinUrl: '',
      majorAchievements: '',
      skills: ''
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile data");
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('hasProfile', 'true');
    setIsEditing(false);
  };

  const p = formData.professionalDetails || {};
  const setP = (field, val) => setFormData({...formData, professionalDetails: {...p, [field]: val}});

  const tabs = [
    { id: 'basic', label: 'Basic Details' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'professional', label: 'Professional Overview' },
    { id: 'documents', label: 'Documents' },
  ];

  const renderHeader = () => (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center">
      
      {/* Left: Avatar with progress ring */}
      <div className="relative flex-shrink-0">
        <div className="w-32 h-32 rounded-full border-4 border-[#F3F4F6] flex items-center justify-center bg-[#E5E7EB] overflow-hidden">
          <svg className="w-20 h-20 text-white translate-y-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        {/* SVG overlay for circular progress (approx 63%) */}
        <svg className="absolute inset-0 w-32 h-32 transform -rotate-90 pointer-events-none">
           <circle cx="64" cy="64" r="60" stroke="#F59E0B" strokeWidth="4" fill="none" strokeDasharray="377" strokeDashoffset="140" strokeLinecap="round" />
        </svg>
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white px-3 py-0.5 rounded-full text-xs font-bold text-orange-500 border border-gray-100 shadow-md">
          63%
        </div>
      </div>

      {/* Middle: Name and details */}
      <div className="flex-1 space-y-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {formData.firstName} {formData.lastName}
            <button className="text-gray-400 hover:text-palette-400 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </h1>
          <p className="text-sm text-gray-400 mt-1">Profile last updated - Today</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
          <div className="space-y-3">
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {formData.professionalDetails?.currentLocation || 'Location not set'}
            </p>
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {formData.isFresher ? 'Fresher' : 'Experienced'}
            </p>
            <p className="flex items-center gap-3 text-palette-400 font-medium cursor-pointer hover:text-palette-900 transition-colors">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Add availability to join
            </p>
          </div>
          <div className="space-y-3 sm:border-l sm:border-gray-100 sm:pl-6">
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {formData.phone || 'N/A'}
              <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </p>
            <p className="flex items-center gap-3">
              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {formData.email}
              <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Missing details widget */}
      <div className="w-full md:w-80 bg-[#FFF8EE] rounded-xl p-6 border border-orange-100 space-y-5 flex-shrink-0 self-stretch flex flex-col justify-between">
        <ul className="space-y-4 text-sm font-semibold text-gray-700">
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-500 shadow-sm">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              Add resume
            </span>
            <span className="text-green-600 font-bold bg-white px-2 py-1 rounded border border-green-100 text-xs shadow-sm">↑ 10%</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-500 shadow-sm">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              Add department
            </span>
            <span className="text-green-600 font-bold bg-white px-2 py-1 rounded border border-green-100 text-xs shadow-sm">↑ 10%</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-200 text-gray-500 shadow-sm">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              Add photo
            </span>
            <span className="text-green-600 font-bold bg-white px-2 py-1 rounded border border-green-100 text-xs shadow-sm">↑ 5%</span>
          </li>
        </ul>
        <button className="w-full py-2.5 mt-2 bg-[#F05A41] hover:bg-[#d94a32] text-white font-bold rounded-full transition-all shadow-lg shadow-[#F05A41]/30 hover:shadow-[#F05A41]/50 transform hover:-translate-y-0.5">
          Add 6 missing details
        </button>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans pb-12">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-xl font-black text-palette-900 cursor-pointer" onClick={() => navigate('/employee')}>
            DreamJob
          </div>
          <button 
            onClick={() => navigate('/employee')}
            className="text-gray-500 hover:text-gray-900 font-semibold text-sm flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-[1200px] w-full mx-auto px-4 mt-6 space-y-6">
        {renderHeader()}

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Left Sidebar */}
          <aside className="w-full md:w-64 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-shrink-0 sticky top-28">
            <nav className="flex flex-col py-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsEditing(false); // Reset edit mode when changing tabs
                  }}
                  className={`text-left px-6 py-4 font-bold text-sm transition-all border-l-4 ${
                    activeTab === tab.id 
                      ? 'border-palette-400 bg-palette-50 text-palette-900' 
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 min-h-[500px]">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">
                {tabs.find(t => t.id === activeTab).label}
              </h2>
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${
                  isEditing 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30' 
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-palette-400 hover:text-palette-900'
                }`}
              >
                {isEditing ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Save Changes
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    Edit Details
                  </>
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="animate-fade-in">
              {activeTab === 'basic' && (
                isEditing ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 focus:border-palette-400 outline-none transition-all" value={formData.firstName || ''} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 focus:border-palette-400 outline-none transition-all" value={formData.lastName || ''} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 focus:border-palette-400 outline-none transition-all" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email (Read Only)</label>
                      <input type="text" disabled className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed" value={formData.email || ''} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Full Name</p>
                      <p className="font-semibold text-gray-900 text-lg">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Email Address</p>
                      <p className="font-semibold text-gray-900 text-lg">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Phone Number</p>
                      <p className="font-semibold text-gray-900 text-lg">{formData.phone || 'Not Provided'}</p>
                    </div>
                  </div>
                )
              )}

              {activeTab === 'professional' && (
                isEditing ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Designation</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" value={p.currentDesignation || ''} onChange={e => setP('currentDesignation', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn Profile URL</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" value={p.linkedinUrl || ''} onChange={e => setP('linkedinUrl', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Location</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" value={p.currentLocation || ''} onChange={e => setP('currentLocation', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Salary</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" value={p.currentSalary || ''} onChange={e => setP('currentSalary', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expected Salary</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" value={p.expectedSalary || ''} onChange={e => setP('expectedSalary', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Skills</label>
                      <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-palette-400 outline-none transition-all" placeholder="React, Node, etc." value={p.skills || ''} onChange={e => setP('skills', e.target.value)} />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Designation</p>
                      <p className="font-semibold text-gray-900 text-lg">{p.currentDesignation || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Current Location</p>
                      <p className="font-semibold text-gray-900 text-lg">{p.currentLocation || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Current Salary</p>
                      <p className="font-semibold text-gray-900 text-lg">{p.currentSalary || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-medium">Expected Salary</p>
                      <p className="font-semibold text-gray-900 text-lg">{p.expectedSalary || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1 font-medium">Skills</p>
                      <p className="font-semibold text-gray-900 text-lg">{p.skills || 'N/A'}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 mb-1 font-medium">LinkedIn</p>
                      <p className="font-semibold text-palette-400">{p.linkedinUrl || 'N/A'}</p>
                    </div>
                  </div>
                )
              )}

              {(activeTab === 'education' || activeTab === 'experience' || activeTab === 'documents') && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Editing Coming Soon</h3>
                  <p className="text-gray-500 max-w-sm">For now, please edit {tabs.find(t=>t.id===activeTab).label.toLowerCase()} during the job application process.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
