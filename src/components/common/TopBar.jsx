import React from 'react';
import { useLocation } from 'react-router-dom';
import { STEPS } from '../../constants/steps';

const TopBar = () => {
    const location = useLocation();

    // Find current step
    const currentStep = STEPS.find(step => location.pathname === step.route);

    // Title logic
    let centerText = '';
    if (currentStep) {
        centerText = `Project 3 — Step ${currentStep.number} of 8`;
    } else if (location.pathname === '/rb/proof') {
        centerText = 'Project 3 — Proof of Work';
    }

    return (
        <header className="top-bar">
            <div className="top-bar-left">
                <h1 style={{ fontSize: '18px', margin: 0 }}>AI Resume Builder</h1>
            </div>
            <div className="top-bar-center">
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    {centerText}
                </span>
            </div>
            <div className="top-bar-right">
                <div className="status-badge">Build Track</div>
            </div>
        </header>
    );
};

export default TopBar;
