import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import TemplateSelectionPage from './components/TemplateSelectionPage';
import EditorPage from './components/EditorPage';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/templates" element={
                <ProtectedRoute>
                  <TemplateSelectionPage />
                </ProtectedRoute>
              } />
              
              <Route path="/editor" element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              } />
              
              <Route path="/editor/:resumeId" element={
                <ProtectedRoute>
                  <EditorPage />
                </ProtectedRoute>
              } />
              
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
}

export default App;