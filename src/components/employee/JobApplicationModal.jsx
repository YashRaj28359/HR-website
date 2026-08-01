import React, { useState } from 'react';

const JobApplicationModal = ({ isOpen, onClose, job }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const [expandedEduIndex, setExpandedEduIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.experience && parsed.experience.length > 0 && !parsed.experience[0].roles) {
          parsed.experience = parsed.experience.map(exp => ({
            companyName: exp.companyName,
            noticePeriod: exp.noticePeriod || '',
            roles: [{
              jobTitle: exp.jobTitle || '',
              employmentType: exp.employmentType || '',
              currentCompany: exp.currentCompany || false,
              joiningDate: exp.joiningDate || '',
              leavingDate: exp.leavingDate || '',
              roleDescription: exp.roleDescription || ''
            }]
          }));
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse profile data");
      }
    }
    return {
      firstName: '',
      lastName: '',
      phone: '',
      email: 'user@example.com',
      
      qualifications: [
        { stream: '', school: '', board: '', startYear: '', endYear: '', percentage: '' }
      ],

      isFresher: false,
      experience: [
        { 
          companyName: '', 
          noticePeriod: '',
          roles: [
            { jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' }
          ]
        }
      ],

      professionalDetails: {
        currentDesignation: '',
        currentSalary: '',
        expectedSalary: '',
        currentLocation: '',
        preferredLocations: [],
        linkedinUrl: '',
        majorAchievements: '',
        skills: ''
      },

      documents: {
        resume: null,
        coverLetter: null
      }
    };
  });

  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  if (!isOpen || !job) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('hasProfile', 'true');
    setIsSubmitted(true);
    
    // Auto-close after 2.5 seconds
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCurrentStep(6); 
    }, 2500);
  };

  // --- Step Components ---

  const Step1BasicDetails = () => (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-palette-400 outline-none transition-all" placeholder="John" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-palette-400 outline-none transition-all" placeholder="Doe" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div className="flex">
          <span className="px-4 py-2 border border-r-0 rounded-l-lg bg-gray-50 text-gray-500 font-semibold">+91</span>
          <input type="text" className="w-full px-4 py-2 border rounded-r-lg focus:ring-2 focus:ring-palette-400 outline-none transition-all" placeholder="9876543210" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input type="email" disabled className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" value={formData.email} />
        <p className="text-xs text-gray-500 mt-1">Email is auto-fetched from your login.</p>
      </div>
    </div>
  );

  const Step2Education = () => {
    const handleAdd = () => {
      setFormData({...formData, qualifications: [...formData.qualifications, { stream: '', school: '', board: '', startYear: '', endYear: '', percentage: '' }]});
      setExpandedEduIndex(formData.qualifications.length);
    };
    const handleChange = (index, field, value) => {
      const newQuals = [...formData.qualifications];
      newQuals[index][field] = value;
      setFormData({...formData, qualifications: newQuals});
    };
    return (
      <div className="space-y-6 animate-fade-in max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-xl font-bold text-gray-900">Education Details</h3>
        {formData.qualifications.map((q, idx) => (
          <div key={idx} className="p-4 border border-gray-200 rounded-xl bg-gray-50 transition-all">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpandedEduIndex(expandedEduIndex === idx ? -1 : idx)}
            >
              <h4 className="font-semibold text-gray-700">
                {q.school || q.stream ? `${q.stream || 'Qualification'} at ${q.school || '...'}` : `Qualification ${idx + 1}`}
              </h4>
              <button type="button" className="text-gray-400 hover:text-gray-600 transition-colors">
                {expandedEduIndex === idx ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                )}
              </button>
            </div>
            
            {expandedEduIndex === idx && (
              <div className="grid grid-cols-2 gap-4 pt-4 mt-2 border-t border-gray-200 animate-fade-in">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Stream / Specialization</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" value={q.stream} onChange={e => handleChange(idx, 'stream', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">School / College</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" value={q.school} onChange={e => handleChange(idx, 'school', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Board / University</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" value={q.board} onChange={e => handleChange(idx, 'board', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Percentage / CGPA</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" value={q.percentage} onChange={e => handleChange(idx, 'percentage', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Start Year</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" placeholder="YYYY" value={q.startYear} onChange={e => handleChange(idx, 'startYear', e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">End Year</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" placeholder="YYYY" value={q.endYear} onChange={e => handleChange(idx, 'endYear', e.target.value)} />
                </div>
              </div>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAdd} className="flex items-center gap-1 text-sm font-bold text-palette-400 hover:text-palette-900 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Add Qualification
        </button>
      </div>
    );
  };

  const Step3Experience = () => {
    const handleAddCompany = () => setFormData({...formData, experience: [...formData.experience, { companyName: '', noticePeriod: '', roles: [{ jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' }] }]});
    
    const handleChangeCompany = (index, field, value) => {
      const newExp = [...formData.experience];
      newExp[index][field] = value;
      setFormData({...formData, experience: newExp});
    };

    const handleAddRole = (companyIndex) => {
      const newExp = [...formData.experience];
      newExp[companyIndex].roles.push({ jobTitle: '', employmentType: '', currentCompany: false, joiningDate: '', leavingDate: '', roleDescription: '' });
      setFormData({...formData, experience: newExp});
    };

    const handleChangeRole = (companyIndex, roleIndex, field, value) => {
      const newExp = [...formData.experience];
      newExp[companyIndex].roles[roleIndex][field] = value;
      setFormData({...formData, experience: newExp});
    };

    return (
      <div className="space-y-6 animate-fade-in max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Work Experience</h3>
          <button type="button" onClick={() => setFormData({...formData, isFresher: !formData.isFresher})} className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${formData.isFresher ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {formData.isFresher ? '✓ Fresher' : 'Skip if you are a Fresher'}
          </button>
        </div>
        
        {!formData.isFresher && (
          <>
            {formData.experience.map((exp, cIdx) => {
              const hasCurrentRole = exp.roles.some(r => r.currentCompany);
              return (
                <div key={cIdx} className="p-4 border border-gray-200 rounded-xl space-y-4 bg-gray-50">
                  <h4 className="font-semibold text-gray-700">Company {cIdx + 1}</h4>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm bg-white" value={exp.companyName} onChange={e => handleChangeCompany(cIdx, 'companyName', e.target.value)} />
                  </div>

                  {exp.roles.map((role, rIdx) => (
                    <div key={rIdx} className="p-4 border border-dashed border-gray-300 rounded-lg space-y-4 bg-white mt-4 relative">
                      <div className="absolute -top-3 left-3 bg-white px-2 text-xs font-semibold text-palette-400">Role {rIdx + 1}</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                          <input type="text" className="w-full px-3 py-2 border rounded-lg text-sm" value={role.jobTitle} onChange={e => handleChangeRole(cIdx, rIdx, 'jobTitle', e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Employment Type</label>
                          <select className="w-full px-3 py-2 border rounded-lg text-sm" value={role.employmentType} onChange={e => handleChangeRole(cIdx, rIdx, 'employmentType', e.target.value)}>
                            <option value="">Select</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                          </select>
                        </div>
                        <div className="flex items-center mt-6">
                          <input type="checkbox" id={`current-${cIdx}-${rIdx}`} className="mr-2" checked={role.currentCompany} onChange={e => handleChangeRole(cIdx, rIdx, 'currentCompany', e.target.checked)} />
                          <label htmlFor={`current-${cIdx}-${rIdx}`} className="text-sm font-medium text-gray-700">This is my current role here</label>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Joining Date</label>
                          <input type="month" className="w-full px-3 py-2 border rounded-lg text-sm" value={role.joiningDate} onChange={e => handleChangeRole(cIdx, rIdx, 'joiningDate', e.target.value)} />
                        </div>
                        {!role.currentCompany && (
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Leaving Date</label>
                            <input type="month" className="w-full px-3 py-2 border rounded-lg text-sm" value={role.leavingDate} onChange={e => handleChangeRole(cIdx, rIdx, 'leavingDate', e.target.value)} />
                          </div>
                        )}
                        <div className="col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Role Description</label>
                          <textarea className="w-full px-3 py-2 border rounded-lg text-sm h-20 resize-none" placeholder="Describe your responsibilities..." value={role.roleDescription} onChange={e => handleChangeRole(cIdx, rIdx, 'roleDescription', e.target.value)} />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-start">
                    <button type="button" onClick={() => handleAddRole(cIdx)} className="flex items-center gap-1 text-xs font-bold text-palette-400 hover:text-palette-900 transition-colors mt-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      Add Role
                    </button>
                  </div>

                  {hasCurrentRole && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="block text-xs font-medium text-gray-700 mb-1">Notice Period</label>
                      <select className="w-1/2 px-3 py-2 border rounded-lg text-sm bg-white" value={exp.noticePeriod} onChange={e => handleChangeCompany(cIdx, 'noticePeriod', e.target.value)}>
                        <option value="">Select</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90+ Days">90+ Days</option>
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
            <button type="button" onClick={handleAddCompany} className="flex items-center gap-1 text-sm font-bold text-palette-400 hover:text-palette-900 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              Add Company
            </button>
          </>
        )}
      </div>
    );
  };

  const Step4Professional = () => {
    const p = formData.professionalDetails;
    const setP = (field, val) => setFormData({...formData, professionalDetails: {...p, [field]: val}});
    return (
      <div className="space-y-4 animate-fade-in max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Designation</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" value={p.currentDesignation} onChange={e => setP('currentDesignation', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL</label>
            <input type="url" className="w-full px-3 py-2 border rounded-lg" value={p.linkedinUrl} onChange={e => setP('linkedinUrl', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 5 LPA" value={p.currentSalary} onChange={e => setP('currentSalary', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="e.g. 8 LPA" value={p.expectedSalary} onChange={e => setP('expectedSalary', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" value={p.currentLocation} onChange={e => setP('currentLocation', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Locations (Comma separated)</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Bangalore, Pune..." value={p.preferredLocations} onChange={e => setP('preferredLocations', e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (Comma separated)</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="React, Node.js, Video Editing..." value={p.skills} onChange={e => setP('skills', e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Major Achievements</label>
            <textarea className="w-full px-3 py-2 border rounded-lg h-20 resize-none" value={p.majorAchievements} onChange={e => setP('majorAchievements', e.target.value)} />
          </div>
        </div>
      </div>
    );
  };

  const Step5Documents = () => (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-xl font-bold text-gray-900">Documents</h3>
      <div className="space-y-4">
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer relative">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium text-palette-400">Upload Resume</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
        </div>

        <div className="p-6 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 text-center hover:bg-gray-100 transition-colors cursor-pointer relative">
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" />
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium text-palette-400">Upload Cover Letter (Optional)</span> or drag and drop
          </div>
          <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
        </div>
      </div>
    </div>
  );

  const Step6Review = () => {
    const p = formData.professionalDetails || {};
    return (
      <div className="space-y-6 animate-fade-in max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar text-sm bg-blue-50/30 p-4 rounded-xl border border-blue-100">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-palette-900 mb-2">Final Review (Page 6)</h3>
          <p className="text-gray-500">Please review all the details you filled in before submitting.</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Basic Details</h4>
          <p><span className="font-semibold text-gray-600">Name:</span> {(formData.firstName || formData.lastName) ? `${formData.firstName || ''} ${formData.lastName || ''}`.trim() : 'N/A'}</p>
          <p><span className="font-semibold text-gray-600">Phone:</span> {formData.phone || 'N/A'}</p>
          <p><span className="font-semibold text-gray-600">Email:</span> {formData.email || 'N/A'}</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Education</h4>
          {(!formData.qualifications || formData.qualifications.length === 0) ? (
            <p className="text-gray-500 italic">N/A</p>
          ) : (
            formData.qualifications.map((q, i) => (
              <p key={i}>• {q.stream || 'N/A'} from {q.school || 'N/A'} ({q.startYear || 'N/A'}-{q.endYear || 'N/A'}) - {q.percentage || 'N/A'}</p>
            ))
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Work Experience</h4>
          {formData.isFresher ? (
            <p className="font-medium text-palette-900">Fresher (No Experience)</p>
          ) : (!formData.experience || formData.experience.length === 0) ? (
            <p className="text-gray-500 italic">N/A</p>
          ) : (
            formData.experience.map((e, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <p className="font-bold text-palette-900">{e.companyName || 'N/A'}</p>
                <div className="pl-3 mt-1 border-l-2 border-gray-200 space-y-2">
                  {e.roles && e.roles.length > 0 ? e.roles.map((r, rIdx) => (
                    <div key={rIdx}>
                      <p className="font-semibold text-gray-700">• {r.jobTitle || 'N/A'}</p>
                      <p className="text-gray-500 text-xs pl-3">({r.joiningDate || 'N/A'} to {r.currentCompany ? 'Present' : (r.leavingDate || 'N/A')})</p>
                    </div>
                  )) : (
                    <p className="text-gray-500 italic text-xs">Roles: N/A</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Professional Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <p><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Designation</span> {p.currentDesignation || 'N/A'}</p>
            <p><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Current Salary</span> {p.currentSalary || 'N/A'}</p>
            <p><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Expected Salary</span> {p.expectedSalary || 'N/A'}</p>
            <p><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Current Location</span> {p.currentLocation || 'N/A'}</p>
            <p className="col-span-2"><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Preferred Locations</span> {p.preferredLocations || 'N/A'}</p>
            <p className="col-span-2"><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">Skills</span> {p.skills || 'N/A'}</p>
            <p className="col-span-2"><span className="font-semibold text-gray-600 block text-xs uppercase tracking-wider mb-1">LinkedIn</span> {p.linkedinUrl || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-2">
          <h4 className="font-bold text-gray-800 border-b pb-2 mb-2">Documents</h4>
          <p className="flex items-center gap-2 text-green-700 font-bold bg-green-50 p-2 rounded-lg w-max">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Resume Ready
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header & Progress (Hide on submit) */}
        {!isSubmitted && (
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-gray-900">
                {currentStep === 6 ? 'Step 6: Review Your Details' : `Step ${currentStep}: Create Profile & Apply`}
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-palette-900 bg-palette-100">
                    {Math.round((currentStep / totalSteps) * 100)}% Completed
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-100">
                <div style={{ width: `${(currentStep / totalSteps) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-palette-400 transition-all duration-500"></div>
              </div>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 overflow-hidden flex-1 flex flex-col">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in py-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900">Application Submitted!</h3>
              <p className="text-gray-600 max-w-md">Your profile has been saved and your application for <strong>{job.title}</strong> has been sent successfully.</p>
            </div>
          ) : (
            <form id="applicationForm" onSubmit={handleSubmit} className="flex-1">
              {currentStep === 1 && <Step1BasicDetails />}
              {currentStep === 2 && <Step2Education />}
              {currentStep === 3 && <Step3Experience />}
              {currentStep === 4 && <Step4Professional />}
              {currentStep === 5 && <Step5Documents />}
              {currentStep === 6 && <Step6Review />}
            </form>
          )}
        </div>

        {/* Footer Actions */}
        {!isSubmitted && (
          <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50 rounded-b-3xl">
            <button 
              type="button" 
              onClick={handleBack} 
              disabled={currentStep === 1}
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'}`}
            >
              Back
            </button>
            
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                onClick={handleNext}
                className="px-8 py-2.5 bg-palette-900 text-white font-bold rounded-full shadow-lg shadow-palette-900/30 hover:bg-palette-400 hover:shadow-palette-400/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {currentStep === totalSteps - 1 ? 'Review Application' : 'Save & Continue'}
              </button>
            ) : (
              <button 
                type="submit" 
                form="applicationForm"
                className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-full shadow-lg shadow-green-600/30 hover:bg-green-700 hover:shadow-green-700/40 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Submit Application
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default JobApplicationModal;
