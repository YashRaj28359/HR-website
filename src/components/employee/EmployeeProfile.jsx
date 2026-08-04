import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedEduIndex, setExpandedEduIndex] = useState(0);
  const [expandedExpIndex, setExpandedExpIndex] = useState(-1);
  const [skillInput, setSkillInput] = useState('');
  const [formData, setFormData] = useState({
    firstName: 'Yash Raj',
    lastName: 'Singh',
    phone: '9399886418',
    email: 'sonic16t@gmail.com',
    brief: '',
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

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse profile data");
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      localStorage.setItem('hasProfile', 'true');
    }
  }, [formData, isLoaded]);

  const p = formData.professionalDetails || {};
  const setP = (field, val) => setFormData({...formData, professionalDetails: {...p, [field]: val}});
  const docs = formData.documents || {};
  const setDoc = (field, val) => setFormData({...formData, documents: {...docs, [field]: val}});

  const updateArray = (field, index, key, value) => {
    const newArr = [...(formData[field] || [])];
    newArr[index] = { ...newArr[index], [key]: value };
    setFormData({ ...formData, [field]: newArr });
  };
  const addArrayItem = (field, defaultObj) => {
    setFormData({ ...formData, [field]: [...(formData[field] || []), defaultObj] });
  };
  const removeArrayItem = (field, index) => {
    const newArr = [...(formData[field] || [])];
    newArr.splice(index, 1);
    setFormData({ ...formData, [field]: newArr });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillInput.trim();
      if (val) {
        const currentSkills = p.skills ? p.skills.split(',').filter(s => s.trim()) : [];
        if (!currentSkills.includes(val)) {
          setP('skills', [...currentSkills, val].join(', '));
        }
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    const currentSkills = p.skills ? p.skills.split(',').map(s=>s.trim()).filter(s => s) : [];
    setP('skills', currentSkills.filter(s => s !== skillToRemove).join(', '));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Details' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Work Experience' },
    { id: 'professional', label: 'Professional Overview' },
    { id: 'documents', label: 'Documents' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    tabs.forEach(tab => {
      const el = document.getElementById(tab.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tabs]);

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
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
              Add cover letter
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
          <aside className="w-full md:w-64 flex-shrink-0 sticky top-28 bg-white rounded-2xl border border-gray-200 shadow-sm p-4 space-y-2">
            {tabs.map(tab => (
              <div key={tab.id} className="flex justify-between items-center group px-2">
                <button
                  onClick={() => {
                    const el = document.getElementById(tab.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 100;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={`text-left py-2 text-sm transition-all w-full ${
                    activeTab === tab.id 
                      ? 'font-bold text-gray-900' 
                      : 'font-medium text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              </div>
            ))}
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 animate-fade-in space-y-6 min-h-[500px]">

            {/* Continuous Sections */}
            <section id="basic" className="scroll-mt-40 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <div className="mb-6 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Basic Details</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">First Name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={formData.firstName || ''} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Last Name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={formData.lastName || ''} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Email (Read Only)</label>
                  <input type="text" disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed" value={formData.email || ''} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Brief about yourself</label>
                  <textarea 
                    rows="3"
                    placeholder="I am a passionate professional..."
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all custom-scrollbar" 
                    value={formData.brief || ''} 
                    onChange={e => setFormData({...formData, brief: e.target.value})} 
                  ></textarea>
                </div>
              </div>
              </section>

              <section id="education" className="scroll-mt-40 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                <div className="flex justify-between items-start mb-6 pb-2 border-b border-gray-100">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Education</h3>
                    <p className="text-sm text-gray-500 mt-1">Details like course, university, and more, help recruiters identify your educational background</p>
                  </div>
                  <button onClick={() => { setExpandedEduIndex(formData.qualifications?.length || 0); addArrayItem('qualifications', { educationType: '', board: '', endYear: '', schoolMedium: '', percentage: '', university: '', course: '', startYear: '', gradingSystem: '', isPrimary: false }); }} className="text-green-500 hover:text-green-600 font-semibold text-sm">
                    Add +
                  </button>
                </div>
                
                <div className="space-y-6">
                  {(formData.qualifications || []).map((q, idx) => {
                    const isSchool = q.educationType === '10th' || q.educationType === '12th';
                    const isHigher = q.educationType === 'Graduation/Diploma' || q.educationType === 'Masters/Post-Graduation';
                    
                    if (expandedEduIndex !== idx) {
                      return (
                        <div key={idx} className="group relative">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-900 text-[15px]">
                              {isHigher ? (q.course || q.educationType || 'Higher Education') : 
                               isSchool ? (q.educationType === '12th' ? 'Class XII' : 'Class X') : 
                               (q.educationType || 'Education')}
                            </h4>
                            <button onClick={() => setExpandedEduIndex(idx)} className="text-gray-400 hover:text-blue-600 transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                          </div>
                          
                          <p className="text-gray-800 mt-1">
                            {isHigher ? (q.university || 'University not specified') : (q.board || 'Board not specified')}
                          </p>
                          
                          <p className="text-gray-500 text-sm mt-0.5">
                            {isHigher ? `${q.startYear || 'YYYY'} - ${q.endYear || 'YYYY'}` : (q.endYear || 'YYYY')}
                          </p>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={idx} className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm relative">
                        <button onClick={() => { removeArrayItem('qualifications', idx); setExpandedEduIndex(-1); }} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors z-10">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                        
                        <div className="space-y-6 pt-2">
                          <div>
                            <label className="block text-sm font-bold text-gray-900 mb-1.5">Education <span className="text-red-500">*</span></label>
                            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.educationType || ''} onChange={e => updateArray('qualifications', idx, 'educationType', e.target.value)}>
                              <option value="">Select education type</option>
                              <option value="10th">10th</option>
                              <option value="12th">12th</option>
                              <option value="Graduation/Diploma">Graduation/Diploma</option>
                              <option value="Masters/Post-Graduation">Masters/Post-Graduation</option>
                            </select>
                          </div>

                          {isSchool && (
                            <>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Board <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.board || ''} onChange={e => updateArray('qualifications', idx, 'board', e.target.value)}>
                                  <option value="">Select board</option>
                                  <option value="CBSE">CBSE</option>
                                  <option value="ICSE">ICSE</option>
                                  <option value="State Board">State Board</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Passing out year <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.endYear || ''} onChange={e => updateArray('qualifications', idx, 'endYear', e.target.value)}>
                                  <option value="">Select passing out year</option>
                                  {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i + 5).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">School medium <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.schoolMedium || ''} onChange={e => updateArray('qualifications', idx, 'schoolMedium', e.target.value)}>
                                  <option value="">Select medium</option>
                                  <option value="English">English</option>
                                  <option value="Hindi">Hindi</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Marks <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="% marks of 100 maximum" value={q.percentage || ''} onChange={e => updateArray('qualifications', idx, 'percentage', e.target.value)} />
                              </div>
                            </>
                          )}

                          {isHigher && (
                            <>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">University/Institute <span className="text-red-500">*</span></label>
                                <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="Select university/institute" value={q.university || ''} onChange={e => updateArray('qualifications', idx, 'university', e.target.value)} />
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Course <span className="text-red-500">*</span></label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.course || ''} onChange={e => updateArray('qualifications', idx, 'course', e.target.value)}>
                                  <option value="">Select course</option>
                                  <option value="B.Tech/B.E.">B.Tech/B.E.</option>
                                  <option value="B.Sc">B.Sc</option>
                                  <option value="B.Com">B.Com</option>
                                  <option value="B.A">B.A</option>
                                  <option value="BBA">BBA</option>
                                  <option value="M.Tech/M.E.">M.Tech/M.E.</option>
                                  <option value="MBA/PGDM">MBA/PGDM</option>
                                  <option value="MCA">MCA</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Course duration <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-4">
                                  <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.startYear || ''} onChange={e => updateArray('qualifications', idx, 'startYear', e.target.value)}>
                                    <option value="">Starting year</option>
                                    {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                                      <option key={year} value={year}>{year}</option>
                                    ))}
                                  </select>
                                  <span className="font-bold text-gray-900">To</span>
                                  <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.endYear || ''} onChange={e => updateArray('qualifications', idx, 'endYear', e.target.value)}>
                                    <option value="">Ending year</option>
                                    {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i + 5).map(year => (
                                      <option key={year} value={year}>{year}</option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1.5">Grading system</label>
                                <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={q.gradingSystem || ''} onChange={e => updateArray('qualifications', idx, 'gradingSystem', e.target.value)}>
                                  <option value="">Select grading system</option>
                                  <option value="Scale 10 Grading System">Scale 10 Grading System</option>
                                  <option value="Scale 4 Grading System">Scale 4 Grading System</option>
                                  <option value="% Marks of 100 Maximum">% Marks of 100 Maximum</option>
                                </select>
                              </div>
                              {q.gradingSystem && (
                                <div>
                                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Marks <span className="text-red-500">*</span></label>
                                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="Enter grade or marks" value={q.percentage || ''} onChange={e => updateArray('qualifications', idx, 'percentage', e.target.value)} />
                                </div>
                              )}
                              {q.educationType === 'Graduation/Diploma' && (
                                <div className="flex items-center pt-2">
                                  <input type="checkbox" id={`primary-grad-${idx}`} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500" checked={q.isPrimary || false} onChange={e => updateArray('qualifications', idx, 'isPrimary', e.target.checked)} />
                                  <label htmlFor={`primary-grad-${idx}`} className="ml-3 text-gray-700 font-medium">Make this as my primary graduation/diploma</label>
                                </div>
                              )}
                            </>
                          )}
                          
                          <div className="flex justify-end mt-4">
                            <button onClick={() => setExpandedEduIndex(-1)} className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-sm">Save</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="pt-4">
                    <button onClick={() => { setExpandedEduIndex(formData.qualifications?.length || 0); addArrayItem('qualifications', { educationType: '', board: '', endYear: '', schoolMedium: '', percentage: '', university: '', course: '', startYear: '', gradingSystem: '', isPrimary: false }); }} className="text-green-500 font-semibold hover:text-green-600 text-sm">
                      Add +
                    </button>
                  </div>
                </div>
              </section>

              <section id="experience" className="scroll-mt-40 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <div className="flex justify-between items-start mb-6 pb-2 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Work Experience</h3>
                </div>
                <button onClick={() => { setExpandedExpIndex(formData.experience?.length || 0); addArrayItem('experience', { companyName: '', noticePeriod: '', roles: [{ jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' }] }); }} className="text-green-500 font-semibold hover:text-green-600 text-sm">
                  Add +
                </button>
              </div>
              <div className="space-y-6">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-gray-700">Are you a Fresher?</label>
                        <button type="button" onClick={() => setFormData({...formData, isFresher: !formData.isFresher})} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${formData.isFresher ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {formData.isFresher ? '✓ Yes, I am a Fresher' : 'No, I have experience'}
                        </button>
                      </div>
                      
                      {!formData.isFresher && (
                        <div className="space-y-6">
                          {(formData.experience || []).map((exp, cIdx) => {
                            const hasCurrentRole = (exp.roles || []).some(r => r.currentCompany);
                            
                            if (expandedExpIndex !== cIdx) {
                              return (
                                <div key={cIdx} className="group relative border-b border-gray-100 last:border-0 pb-6 mb-6 last:pb-0 last:mb-0">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-bold text-gray-900 text-[15px]">
                                      {exp.companyName || 'Company Name'}
                                    </h4>
                                    <button onClick={() => setExpandedExpIndex(cIdx)} className="text-gray-400 hover:text-blue-600 transition-colors">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                    </button>
                                  </div>
                                  
                                  <div className="mt-4 pl-4 border-l-2 border-green-500 ml-2 space-y-5">
                                    {(exp.roles || []).map((role, rIdx) => (
                                      <div key={rIdx} className="relative">
                                        <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[23px] top-1.5 ring-4 ring-white"></div>
                                        <p className="font-semibold text-gray-800">{role.jobTitle || 'Job Title'}</p>
                                        <p className="text-gray-500 text-sm mt-0.5">
                                          {role.joiningDate || 'YYYY-MM'} - {role.currentCompany ? 'Present' : (role.leavingDate || 'YYYY-MM')} | {role.employmentType || 'Employment Type'}
                                        </p>
                                        {role.roleDescription && (
                                          <p className="text-gray-600 text-sm mt-2">{role.roleDescription}</p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            
                            return (
                              <div key={cIdx} className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50 relative">
                                <button onClick={() => { removeArrayItem('experience', cIdx); setExpandedExpIndex(-1); }} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-10">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                                <h4 className="font-semibold text-gray-700 pr-8">Company {cIdx + 1}</h4>
                                <div>
                                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={exp.companyName || ''} onChange={e => {
                                    const newExp = [...(formData.experience || [])];
                                    newExp[cIdx].companyName = e.target.value;
                                    setFormData({...formData, experience: newExp});
                                  }} />
                                </div>
                                <div className="relative border-l-2 border-green-500 ml-3 mt-8 space-y-8 pb-4">
                                  {(exp.roles || []).map((role, rIdx) => (
                                    <div key={rIdx} className="relative pl-6">
                                      <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-green-500 border-4 border-gray-50 shadow-sm"></div>
                                      
                                      <div className="p-6 border border-gray-200 rounded-xl space-y-6 bg-white shadow-sm relative group">
                                        <button onClick={() => {
                                          const newExp = [...(formData.experience || [])];
                                          newExp[cIdx].roles.splice(rIdx, 1);
                                          setFormData({...formData, experience: newExp});
                                        }} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors hidden group-hover:block">
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                        
                                        <div className="absolute -top-3 left-4 bg-white px-3 text-sm font-bold text-green-600 border border-green-100 rounded-full shadow-sm">Role {rIdx + 1}</div>
                                        
                                        <div className="space-y-6 pt-2">
                                      <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1.5">Job Title <span className="text-red-500">*</span></label>
                                        <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={role.jobTitle || ''} onChange={e => {
                                          const newExp = [...(formData.experience || [])];
                                          newExp[cIdx].roles[rIdx].jobTitle = e.target.value;
                                          setFormData({...formData, experience: newExp});
                                        }} />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-bold text-gray-900 mb-1.5">Employment Type <span className="text-red-500">*</span></label>
                                        <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={role.employmentType || ''} onChange={e => {
                                          const newExp = [...(formData.experience || [])];
                                          newExp[cIdx].roles[rIdx].employmentType = e.target.value;
                                          setFormData({...formData, experience: newExp});
                                        }}>
                                          <option value="">Select</option>
                                          <option value="Full-time">Full-time</option>
                                          <option value="Part-time">Part-time</option>
                                          <option value="Contract">Contract</option>
                                        </select>
                                      </div>
                                      <div className="flex items-center mt-6">
                                        <input type="checkbox" id={`current-${cIdx}-${rIdx}`} className="w-5 h-5 rounded border-gray-300 text-green-500 focus:ring-green-500 mr-3" checked={role.currentCompany || false} onChange={e => {
                                          const newExp = [...(formData.experience || [])];
                                          newExp[cIdx].roles[rIdx].currentCompany = e.target.checked;
                                          if (e.target.checked) newExp[cIdx].roles[rIdx].leavingDate = '';
                                          setFormData({...formData, experience: newExp});
                                        }} />
                                        <label htmlFor={`current-${cIdx}-${rIdx}`} className="text-sm font-bold text-gray-900">Current role</label>
                                      </div>
                                      <div className="space-y-6">
                                        <div>
                                          <label className="block text-sm font-bold text-gray-900 mb-1.5">Joining <span className="text-red-500">*</span></label>
                                          <input type="month" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={role.joiningDate || ''} onChange={e => {
                                            const newExp = [...(formData.experience || [])];
                                            newExp[cIdx].roles[rIdx].joiningDate = e.target.value;
                                            setFormData({...formData, experience: newExp});
                                          }} />
                                        </div>
                                        {!role.currentCompany && (
                                          <div>
                                            <label className="block text-sm font-bold text-gray-900 mb-1.5">Leaving <span className="text-red-500">*</span></label>
                                            <input type="month" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={role.leavingDate || ''} onChange={e => {
                                              const newExp = [...(formData.experience || [])];
                                              newExp[cIdx].roles[rIdx].leavingDate = e.target.value;
                                              setFormData({...formData, experience: newExp});
                                            }} />
                                          </div>
                                        )}
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-sm font-bold text-gray-900 mb-1.5">Role Description</label>
                                        <textarea className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 h-24 resize-none outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={role.roleDescription || ''} onChange={e => {
                                          const newExp = [...(formData.experience || [])];
                                          newExp[cIdx].roles[rIdx].roleDescription = e.target.value;
                                          setFormData({...formData, experience: newExp});
                                        }} />
                                      </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}

                                  <div className="relative pl-6">
                                    <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-gray-300 border-2 border-gray-50"></div>
                                    <button type="button" onClick={() => {
                                      const newExp = [...(formData.experience || [])];
                                      newExp[cIdx].roles.push({ jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' });
                                      setFormData({...formData, experience: newExp});
                                    }} className="flex items-center gap-1 text-sm font-bold text-green-600 hover:text-green-700 transition-colors">
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                      Add Role
                                    </button>
                                  </div>
                                </div>

                                {hasCurrentRole && (
                                  <div className="mt-6 pt-6 border-t border-gray-200">
                                    <label className="block text-sm font-bold text-gray-900 mb-1.5">Notice Period</label>
                                    <select className="w-1/2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={exp.noticePeriod || ''} onChange={e => {
                                      const newExp = [...(formData.experience || [])];
                                      newExp[cIdx].noticePeriod = e.target.value;
                                      setFormData({...formData, experience: newExp});
                                    }}>
                                      <option value="">Select</option>
                                      <option value="15 Days">15 Days</option>
                                      <option value="30 Days">30 Days</option>
                                      <option value="60 Days">60 Days</option>
                                      <option value="90+ Days">90+ Days</option>
                                    </select>
                                  </div>
                                )}
                                <div className="flex justify-end mt-4">
                                  <button onClick={() => setExpandedExpIndex(-1)} className="px-6 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors shadow-sm">Save</button>
                                </div>
                              </div>
                            );
                          })}
                          
                          <div className="pt-4">
                            <button onClick={() => { setExpandedExpIndex(formData.experience?.length || 0); addArrayItem('experience', { companyName: '', noticePeriod: '', roles: [{ jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' }] }); }} className="text-green-500 font-semibold hover:text-green-600 text-sm">
                              Add +
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
              </section>

              <section id="professional" className="scroll-mt-40 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <div className="mb-6 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Professional Overview</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Current Designation <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={p.currentDesignation || ''} onChange={e => setP('currentDesignation', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">LinkedIn Profile URL <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={p.linkedinUrl || ''} onChange={e => setP('linkedinUrl', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Current Location <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={p.currentLocation || ''} onChange={e => setP('currentLocation', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Current Salary <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={p.currentSalary || ''} onChange={e => setP('currentSalary', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Expected Salary <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" value={p.expectedSalary || ''} onChange={e => setP('expectedSalary', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Skills <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(p.skills ? p.skills.split(',').filter(s => s.trim()) : []).map(skill => (
                      <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 flex items-center gap-1 cursor-pointer hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors" onClick={() => removeSkill(skill)} title="Click to remove">
                        {skill} <span className="text-[10px]">✕</span>
                      </span>
                    ))}
                  </div>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500" placeholder="Type a skill and hit Enter" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} />
                </div>
              </div>
              </section>

              <section id="documents" className="scroll-mt-40 bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
              <div className="mb-6 pb-2 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">Documents</h3>
              </div>
              <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Upload Resume <span className="text-red-500">*</span></label>
                        <input type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-palette-50 file:text-palette-900 hover:file:bg-palette-100 cursor-pointer" onChange={e => setDoc('resume', e.target.files[0]?.name || '')} />
                        {docs.resume && <p className="text-sm text-gray-600 mt-3 flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> {docs.resume}</p>}
                      </div>
                      <div className="p-4 border border-gray-200 rounded-xl">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Upload Cover Letter <span className="text-red-500">*</span></label>
                        <input type="file" accept=".pdf,.doc,.docx" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-palette-50 file:text-palette-900 hover:file:bg-palette-100 cursor-pointer" onChange={e => setDoc('coverLetter', e.target.files[0]?.name || '')} />
                        {docs.coverLetter && <p className="text-sm text-gray-600 mt-3 flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> {docs.coverLetter}</p>}
                      </div>
                    </div>
                </div>
              </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;
