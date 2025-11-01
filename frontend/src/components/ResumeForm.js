import React, { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';

const ResumeForm = () => {
  const {
    resumeData,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    removeExperience,
    addEducation,
    removeEducation,
    updateSkills
  } = useResume();
  
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  // Format and validate MM/YYYY date input
  const formatDateInput = (value) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YYYY
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits.slice(0, 2) + '/' + digits.slice(2, 6);
  };

  const validateDate = (value) => {
    if (!value) return true; // Empty is valid
    
    const datePattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if (!datePattern.test(value)) {
      return false;
    }
    
    const [month, year] = value.split('/').map(Number);
    const currentYear = new Date().getFullYear();
    
    // Validate month and reasonable year range
    if (month < 1 || month > 12 || year < 1950 || year > currentYear + 10) {
      return false;
    }
    
    return true;
  };

  const handleDateChange = (setter, field, value) => {
    const formatted = formatDateInput(value);
    setter(prev => ({ ...prev, [field]: formatted }));
    
    // Validate on complete input
    if (formatted.length === 7) {
      if (!validateDate(formatted)) {
        setFormErrors(prev => ({ 
          ...prev, 
          [field]: 'Invalid date format. Use MM/YYYY (e.g., 01/2020)' 
        }));
      } else {
        setFormErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Invalid email address.';
    }
    if (name === 'phone' && value && !/^[0-9-()+ ]+$/.test(value)) {
      error = 'Invalid phone number.';
    }
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handlePersonalInfoChange = (field, value) => {
    validateField(field, value);
    updatePersonalInfo({ [field]: value });
  };

  const handleSummaryChange = (e) => {
    updateSummary(e.target.value);
  };

  const handleAddExperience = () => {
    // Validate dates before adding
    if (newExperience.startDate && !validateDate(newExperience.startDate)) {
      alert('Please enter a valid start date in MM/YYYY format');
      return;
    }
    if (!newExperience.current && newExperience.endDate && !validateDate(newExperience.endDate)) {
      alert('Please enter a valid end date in MM/YYYY format');
      return;
    }
    
    if (newExperience.company && newExperience.position) {
      addExperience(newExperience);
      setNewExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      });
    }
  };

  const handleAddEducation = () => {
    // Validate dates before adding
    if (newEducation.startDate && !validateDate(newEducation.startDate)) {
      alert('Please enter a valid start date in MM/YYYY format');
      return;
    }
    if (newEducation.endDate && !validateDate(newEducation.endDate)) {
      alert('Please enter a valid end date in MM/YYYY format');
      return;
    }
    
    if (newEducation.institution && newEducation.degree) {
      addEducation(newEducation);
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
    }
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    updateSkills(skills);
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={resumeData.personalInfo.firstName}
            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={resumeData.personalInfo.lastName}
            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <input
              type="email"
              placeholder="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>
          <input
            type="text"
            placeholder="Address"
            value={resumeData.personalInfo.address}
            onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={resumeData.personalInfo.github}
            onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Professional Summary
        </h3>
        <textarea
          placeholder="Write a brief summary about yourself..."
          value={resumeData.summary}
          onChange={handleSummaryChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Work Experience */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Work Experience
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Position"
            value={newExperience.position}
            onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <input
              type="text"
              placeholder="Start Date (MM/YYYY)"
              value={newExperience.startDate}
              onChange={(e) => handleDateChange(setNewExperience, 'startDate', e.target.value)}
              maxLength="7"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formErrors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.startDate && <p className="text-red-500 text-xs mt-1">{formErrors.startDate}</p>}
            <p className="text-xs text-gray-500 mt-1">Format: MM/YYYY (e.g., 01/2020)</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="End Date (MM/YYYY)"
              value={newExperience.endDate}
              onChange={(e) => handleDateChange(setNewExperience, 'endDate', e.target.value)}
              maxLength="7"
              disabled={newExperience.current}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${newExperience.current ? 'bg-gray-100' : ''} ${formErrors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.endDate && <p className="text-red-500 text-xs mt-1">{formErrors.endDate}</p>}
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={newExperience.current}
                onChange={(e) => setNewExperience({...newExperience, current: e.target.checked, endDate: ''})}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Currently working here</span>
            </label>
          </div>
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2"
          />
          <button
            onClick={handleAddExperience}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 md:col-span-2"
          >
            Add Experience
          </button>
        </div>
        
        {resumeData.experiences.map((exp, index) => (
          <div key={exp.id} className="bg-white p-3 rounded border mb-2 flex justify-between items-center">
            <div>
              <strong>{exp.position}</strong> at {exp.company}
              <div className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </div>
            </div>
            <button
              onClick={() => removeExperience(exp.id)}
              className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Education
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={newEducation.field}
            onChange={(e) => setNewEducation({...newEducation, field: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div>
            <input
              type="text"
              placeholder="Start Date (MM/YYYY)"
              value={newEducation.startDate}
              onChange={(e) => handleDateChange(setNewEducation, 'startDate', e.target.value)}
              maxLength="7"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formErrors.eduStartDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.eduStartDate && <p className="text-red-500 text-xs mt-1">{formErrors.eduStartDate}</p>}
            <p className="text-xs text-gray-500 mt-1">Format: MM/YYYY</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="End Date (MM/YYYY)"
              value={newEducation.endDate}
              onChange={(e) => handleDateChange(setNewEducation, 'endDate', e.target.value)}
              maxLength="7"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${formErrors.eduEndDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            />
            {formErrors.eduEndDate && <p className="text-red-500 text-xs mt-1">{formErrors.eduEndDate}</p>}
            <p className="text-xs text-gray-500 mt-1">Format: MM/YYYY</p>
          </div>
          <input
            type="text"
            placeholder="GPA"
            value={newEducation.gpa}
            onChange={(e) => setNewEducation({...newEducation, gpa: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddEducation}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 md:col-span-2"
          >
            Add Education
          </button>
        </div>
        
        {resumeData.education.map((edu, index) => (
          <div key={edu.id} className="bg-white p-3 rounded border mb-2 flex justify-between items-center">
            <div>
              <strong>{edu.degree}</strong> at {edu.institution}
              <div className="text-sm text-gray-600">
                {edu.startDate} - {edu.endDate}
              </div>
            </div>
            <button
              onClick={() => removeEducation(edu.id)}
              className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="bg-gray-50 rounded-lg p-4 border">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Skills
        </h3>
        <textarea
          placeholder="Enter skills separated by commas (e.g., JavaScript, React, Java, Spring Boot)"
          value={resumeData.skills.join(', ')}
          onChange={handleSkillsChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;