import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { resumeAPI } from '../../services/api';
import ResumeList from './ResumeList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await resumeAPI.getUserResumes();
      setResumes(response.data);
    } catch (error) {
      console.error('Error fetching resumes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = () => {
    navigate('/templates');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.deleteResume(id);
        setResumes(resumes.filter(resume => resume.id !== id));
      } catch (error) {
        console.error('Error deleting resume:', error);
        alert('Error deleting resume');
      }
    }
  };

  const handleEditResume = (id) => {
    navigate(`/editor/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">My Resumes</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user?.firstName}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={handleCreateNew}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 font-medium"
          >
            + Create New Resume
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-600 text-lg">
            Loading your resumes...
          </div>
        ) : (
          <ResumeList 
            resumes={resumes} 
            onDelete={handleDeleteResume}
            onEdit={handleEditResume}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;