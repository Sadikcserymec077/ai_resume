import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStep } from '../contexts/StepContext';
import { STEPS } from '../constants/steps';

const StepPage = () => {
    const location = useLocation();
    const { setCurrentStep, setBuildContent } = useStep();

    const step = STEPS.find(s => s.route === location.pathname);

    useEffect(() => {
        if (step) {
            setCurrentStep(step.number);
            // Mock content for build panel based on step
            setBuildContent(`// Build instructions for ${step.title}\n// Copy this code to Lovable\n\nconsole.log("Building step ${step.number}: ${step.title}");`);
        }
    }, [step, setCurrentStep, setBuildContent]);

    if (!step) return <div>Step not found</div>;

    return (
        <div className="step-page">
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{step.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
                This is the workspace for Step {step.number}. Follow the instructions in the build panel to proceed.
            </p>

            <div style={{ marginTop: '24px', padding: '24px', background: '#f9f9f9', borderRadius: '8px' }}>
                <h3>Step Details</h3>
                <p>Implementation details generally go here. For this demo, please follow the build instructions on the right.</p>
            </div>
        </div>
    );
};

export default StepPage;
