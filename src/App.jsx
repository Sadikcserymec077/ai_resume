import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PremiumLayout from './layouts/PremiumLayout';
import StepPage from './pages/StepPage';
import ProofPage from './pages/ProofPage';
import { STEPS } from './constants/steps';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Navigate to={STEPS[0].route} replace />} />

        <Route element={<PremiumLayout />}>
          {STEPS.map(step => (
            <Route key={step.id} path={step.route} element={<StepPage />} />
          ))}
          <Route path="/rb/proof" element={<ProofPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
