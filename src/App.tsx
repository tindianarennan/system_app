import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Maintenance from './pages/Maintenance';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="fuel" element={<div>Abastecimento</div>} />
          <Route path="tires" element={<div>Pneus</div>} />
          <Route path="checklist" element={<div>Checklist</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}