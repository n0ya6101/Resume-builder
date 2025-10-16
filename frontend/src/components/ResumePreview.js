import React from 'react';
import { useResume } from '../contexts/ResumeContext';

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();

  const renderTemplate1 = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-blue-500 pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        <div className="flex justify-center space-x-4 text-gray-600 text-sm">
          {resumeData.personalInfo.email && <span>{resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>• {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.address && <span>• {resumeData.personalInfo.address}</span>}
        </div>
      </header>

      {/* Summary */}
      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700">{resumeData.summary}</p>
        </section>
      )}

      {/* Experience */}
      {resumeData.experiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          {resumeData.experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                <span className="text-gray-600 text-sm">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{exp.company}</p>
              {exp.description && <p className="text-gray-600 text-sm">{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {resumeData.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Education
          </h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
              {edu.field && <p className="text-gray-600 text-sm">{edu.field}</p>}
              {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {resumeData.skills.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderTemplate2 = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg border-l-4 border-green-500">
      {/* Header */}
      <header className="bg-green-50 p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {resumeData.personalInfo.email && <span>📧 {resumeData.personalInfo.email}</span>}
          {resumeData.personalInfo.phone && <span>📱 {resumeData.personalInfo.phone}</span>}
          {resumeData.personalInfo.address && <span>📍 {resumeData.personalInfo.address}</span>}
        </div>
      </header>

      {/* Rest of the template remains similar but with different styling */}
      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-3">SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>
      )}

      {/* Add similar sections for experience, education, skills with green theme */}
    </div>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return renderTemplate1();
      case 'template2':
        return renderTemplate2();
      case 'template3':
        return renderTemplate1(); // Use template1 as base for now
      default:
        return renderTemplate1();
    }
  };

  return (
    <div className="resume-preview">
      <div className="transform scale-75 origin-top-left w-[133%]">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;