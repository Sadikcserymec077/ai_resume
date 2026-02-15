import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import BuildTrackLayout from './layouts/BuildTrackLayout';
import HomePage from './pages/HomePage';
import BuilderPage from './pages/BuilderPage';
import PreviewPage from './pages/PreviewPage';
import AppProofPage from './pages/AppProofPage';
import BuildTrackProofPage from './pages/BuildTrackProofPage';
import StepPage from './pages/StepPage';
import { ResumeProvider } from './contexts/ResumeContext';
import { STEPS } from './constants/steps';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ResumeProvider>
        <Routes>
          {/* Resume App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/preview" element={<PreviewPage />} />
            <Route path="/proof" element={<AppProofPage />} />
          </Route>

          {/* Build Track Routes */}
          <Route element={<BuildTrackLayout />}>
            {STEPS.map(step => (
              <Route key={step.id} path={step.route} element={<StepPage />} />
            ))}
            <Route path="/rb/proof" element={<BuildTrackProofPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
