import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PremiumLayout from './layouts/PremiumLayout';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import ProofPage from './pages/ProofPage';
import { ResumeProvider } from './contexts/ResumeContext';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ResumeProvider>
        <Routes>
          <Route element={<PremiumLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/proof" element={<ProofPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
