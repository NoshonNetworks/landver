import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandRegistrationForm from './components/LandRegistration/LandRegistrationForm';
import LandList from './components/Land/LandList';
import LandDetails from './components/Land/LandDetails';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>Welcome to Land Registry</h1>} />
      <Route path="/register" element={<LandRegistrationForm />} />
      <Route path="/lands" element={<LandList />} />
      <Route path="/lands/:id" element={<LandDetails />} />
    </Routes>
  );
}

export default AppRoutes;