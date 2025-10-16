import React, { createContext, useState, useContext, useEffect } from 'react';
import { resumeAPI } from '../services/api';

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
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
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

  const loadResume = (resume) => {
    try {
      setResumeData({
        personalInfo: resume.personalInfo ? JSON.parse(resume.personalInfo) : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          github: ''
        },
        summary: resume.summary || '',
        experiences: resume.experiences ? JSON.parse(resume.experiences) : [],
        education: resume.education ? JSON.parse(resume.education) : [],
        skills: resume.skills ? JSON.parse(resume.skills) : []
      });
      setSelectedTemplate(resume.templateId || 'template1');
      setCurrentResumeId(resume.id);
      setResumeName(resume.name || 'My Resume');
    } catch (error) {
      console.error('Error loading resume:', error);
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