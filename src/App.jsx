// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TrackPackage from './pages/TrackPackage';
import CreateShipment from './pages/CreateShipment';
import AdminDashboard from './pages/admin/AdminDashboard';
import UpdateTracking from './pages/admin/UpdateTracking';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Projects from './pages/Projects';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/track" element={<TrackPackage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />

        {/* Protected CreateShipment at both /create and /admin/create */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateShipment />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <PrivateRoute>
              <CreateShipment />
            </PrivateRoute>
          }
        />

        {/* Admin-only Dashboard & Update */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/update/:trackingId"
          element={
            <PrivateRoute>
              <UpdateTracking />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
