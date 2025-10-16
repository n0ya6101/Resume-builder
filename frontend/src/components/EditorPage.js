import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';
import { useAuth } from '../contexts/AuthContext';
import { resumeAPI } from '../services/api';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';

const EditorPage = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    resumeData,
    selectedTemplate,
    currentResumeId,
    resumeName,
    setResumeName,
    loadResume,
    resetResume
  } = useResume();

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (resumeId) {
      loadResumeData(resumeId);
    } else {
      resetResume();
    }
  }, [resumeId]);

  const loadResumeData = async (id) => {
    try {
      const response = await resumeAPI.getResume(id);
      loadResume(response.data);
    } catch (error) {
      console.error('Error loading resume:', error);
      alert('Error loading resume');
      navigate('/dashboard');
    }
  };

  const handleSaveResume = async () => {
    if (!resumeName.trim()) {
      alert('Please enter a resume name');
      return;
    }

    setSaving(true);
    try {
      if (currentResumeId) {
        await resumeAPI.updateResume(currentResumeId, {
          ...resumeData,
          templateId: selectedTemplate,
          name: resumeName
        });
      } else {
        await resumeAPI.saveResume(resumeData, selectedTemplate, resumeName);
      }
      alert('Resume saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await resumeAPI.generatePDF(resumeData, selectedTemplate);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume-${resumeData.personalInfo.firstName}-${resumeData.personalInfo.lastName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Dashboard
              </button>
              <input
                type="text"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="text-xl font-semibold bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-2 py-1"
                placeholder="Resume Name"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleSaveResume}
                disabled={saving}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:bg-gray-400"
              >
                {saving ? 'Saving...' : 'Save Resume'}
              </button>
              <button
                onClick={handleDownload}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume Form</h2>
            <ResumeForm />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Preview</h2>
            <div className="border rounded-lg p-4 bg-gray-50">
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;