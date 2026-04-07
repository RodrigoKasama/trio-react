import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import OnlinePage from './pages/OnlinePage';
import OfflinePage from './pages/OfflinePage';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/online' element={<OnlinePage />} />
      <Route path='/offline' element={<OfflinePage />} />
    </Routes>
  );
}
