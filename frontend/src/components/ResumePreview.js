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
      {resumeData.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-green-600 mb-3">SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
        </section>
      )}
    </div>
  );
  
  const renderTemplate4 = () => (
        <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg flex">
            <div className="w-1/3 bg-pink-100 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                </h1>
                <div className="text-gray-600 text-sm">
                    <p>{resumeData.personalInfo.email}</p>
                    <p>{resumeData.personalInfo.phone}</p>
                    <p>{resumeData.personalInfo.address}</p>
                </div>
                 {resumeData.skills.length > 0 && (
                    <section className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
                        <ul className="text-gray-700 list-disc list-inside">
                            {resumeData.skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
            <div className="w-2/3 p-6">
                {resumeData.summary && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b-2 border-pink-500 pb-1">
                            Summary
                        </h2>
                        <p className="text-gray-700">{resumeData.summary}</p>
                    </section>
                )}
                {resumeData.experiences.length > 0 && (
                    <section className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2 border-b-2 border-pink-500 pb-1">
                            Experience
                        </h2>
                        {resumeData.experiences.map((exp, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
                                <p className="text-sm text-gray-600">{exp.startDate} - {exp.endDate || 'Present'}</p>
                                <p className="text-gray-700">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
    const renderTemplate5 = () => (
        <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg border-t-4 border-indigo-500">
            <header className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-gray-800">
                    {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                </h1>
                <p className="text-gray-600">{resumeData.personalInfo.email} | {resumeData.personalInfo.phone}</p>
            </header>
            {resumeData.summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-2">Summary</h2>
                    <p className="text-gray-700">{resumeData.summary}</p>
                </section>
            )}
            {resumeData.experiences.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-indigo-600 mb-2">Experience</h2>
                    {resumeData.experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="font-bold">{exp.position}</h3>
                            <p className="italic">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                            <p>{exp.description}</p>
                        </div>
                    ))}
                </section>
            )}
            {resumeData.education.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-indigo-600 mb-2">Education</h2>
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="font-bold">{edu.institution}</h3>
                            <p>{edu.degree}, {edu.endDate}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
    const renderTemplate6 = () => (
        <div className="bg-gray-100 p-8 max-w-4xl mx-auto shadow-lg">
            <header className="text-left mb-6">
                <h1 className="text-3xl font-monospace text-gray-800">
                    {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                </h1>
                <p className="text-gray-600">{resumeData.personalInfo.email}</p>
            </header>
            {resumeData.skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
            {resumeData.experiences.length > 0 && (
                <section>
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Experience</h2>
                    {resumeData.experiences.map((exp, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="font-semibold">{exp.position}</h3>
                            <p className="text-sm">{exp.company}</p>
                            <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return renderTemplate1();
      case 'template2':
        return renderTemplate2();
      case 'template3':
        return renderTemplate1();
      case 'template4':
        return renderTemplate4();
      case 'template5':
        return renderTemplate5();
      case 'template6':
        return renderTemplate6();
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