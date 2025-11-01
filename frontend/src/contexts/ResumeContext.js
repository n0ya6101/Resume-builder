import React, { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    experiences: [],
    education: [],
    skills: []
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [resumeName, setResumeName] = useState('My Resume');

  const updatePersonalInfo = (info) => {
    setResumeData(prev => ({ 
      ...prev, 
      personalInfo: { ...prev.personalInfo, ...info } 
    }));
  };

  const updateSummary = (summary) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const addExperience = (experience) => {
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { ...experience, id: Date.now() }]
    }));
  };

  const updateExperience = (id, updatedExperience) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...updatedExperience, id } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = (education) => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: Date.now() }]
    }));
  };

  const updateEducation = (id, updatedEducation) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...updatedEducation, id } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateSkills = (skills) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const safeJSONParse = (jsonString, defaultValue) => {
    try {
      if (!jsonString || jsonString.trim() === '') {
        return defaultValue;
      }
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error, 'Value:', jsonString);
      return defaultValue;
    }
  };

  const loadResume = (resume) => {
    try {
      console.log('Loading resume:', resume);
      
      // Parse personal info with fallback
      const personalInfo = safeJSONParse(resume.personalInfo, {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: ''
      });

      // Parse experiences with fallback
      const experiences = safeJSONParse(resume.experiences, []);

      // Parse education with fallback
      const education = safeJSONParse(resume.education, []);

      // Parse skills with fallback
      const skills = safeJSONParse(resume.skills, []);

      setResumeData({
        personalInfo,
        summary: resume.summary || '',
        experiences,
        education,
        skills
      });
      
      setSelectedTemplate(resume.templateId || 'template1');
      setCurrentResumeId(resume.id);
      setResumeName(resume.name || 'My Resume');
      
      console.log('Resume loaded successfully');
    } catch (error) {
      console.error('Error loading resume:', error);
      // Don't throw - just log and use defaults
      alert('There was an error loading the resume. Some data may be missing.');
    }
  };

  const resetResume = () => {
    setResumeData({
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        linkedin: '',
        github: ''
      },
      summary: '',
      experiences: [],
      education: [],
      skills: []
    });
    setCurrentResumeId(null);
    setResumeName('My Resume');
  };

  const value = {
    resumeData,
    selectedTemplate,
    currentResumeId,
    resumeName,
    setResumeName,
    setSelectedTemplate,
    updatePersonalInfo,
    updateSummary,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    updateSkills,
    loadResume,
    resetResume,
    setCurrentResumeId
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};