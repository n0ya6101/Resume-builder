import React from 'react';

const ResumeList = ({ resumes, onDelete, onEdit }) => {
  if (resumes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No resumes yet</h3>
        <p className="text-gray-500">Create your first resume to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Your Resumes ({resumes.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div key={resume.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{resume.name}</h3>
                <p className="text-sm text-gray-600 mb-1">Template: {resume.templateId}</p>
                <p className="text-xs text-gray-500">
                  Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(resume.id)}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(resume.id)}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeList;