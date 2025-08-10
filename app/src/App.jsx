import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CreateEvent from './components/CreateEvent';
import Map from './components/Map';
import Profile from './components/Profile';
import LoadingScreen from './components/LoadingScreen';
import Notification from './components/Notification';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './index.css';

function AppContent() {
  const { currentUser, loading } = useAuth();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoading || loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app">
      <div className="bg-animation">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <Router>
        {currentUser && <Header />}
        
        <Routes>
          <Route path="/login" element={
            !currentUser ? <Login /> : <Navigate to="/" />
          } />
          <Route path="/register" element={
            !currentUser ? <Register /> : <Navigate to="/" />
          } />
          <Route path="/" element={
            currentUser ? <Home /> : <Navigate to="/login" />
          } />
          <Route path="/create" element={
            currentUser ? <CreateEvent /> : <Navigate to="/login" />
          } />
          <Route path="/map" element={
            currentUser ? <Map /> : <Navigate to="/login" />
          } />
          <Route path="/profile" element={
            currentUser ? <Profile /> : <Navigate to="/login" />
          } />
        </Routes>
      </Router>
      
      <Notification />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}