import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../contexts/ResumeContext';

const TemplateSelectionPage = () => {
  const navigate = useNavigate();
  const { setSelectedTemplate, resetResume } = useResume();

  const templates = [
    {
      id: 'template1',
      name: 'Classic',
      description: 'Clean and professional design with traditional layout',
      color: 'bg-blue-500'
    },
    {
      id: 'template2',
      name: 'Modern',
      description: 'Contemporary layout with accent colors and modern typography',
      color: 'bg-green-500'
    },
    {
      id: 'template3',
      name: 'Minimalist',
      description: 'Simple and elegant design with plenty of white space',
      color: 'bg-purple-500'
    }
  ];

  const handleTemplateSelect = (templateId) => {
    resetResume();
    setSelectedTemplate(templateId);
    navigate('/editor');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose a Resume Template
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select a template that best fits your style and industry
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className={`${template.color} h-48 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-4">{template.name}</h3>
                  <div className="space-y-2">
                    <div className="w-16 h-2 bg-white bg-opacity-80 rounded mx-auto"></div>
                    <div className="w-24 h-2 bg-white bg-opacity-80 rounded mx-auto"></div>
                    <div className="w-20 h-2 bg-white bg-opacity-80 rounded mx-auto"></div>
                    <div className="w-12 h-2 bg-white bg-opacity-80 rounded mx-auto"></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {template.description}
                </p>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200">
                  Select Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionPage;