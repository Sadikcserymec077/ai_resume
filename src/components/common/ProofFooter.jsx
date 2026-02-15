import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStep } from '../../contexts/StepContext';
import { STEPS, PROOF_ROUTE } from '../../constants/steps';
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';

const ProofFooter = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { artifacts } = useStep();

    const currentStepIndex = STEPS.findIndex(step => step.route === location.pathname);
    const currentStep = STEPS[currentStepIndex];

    // If on proof page, maybe show something else or hide footer?
    // User prompt implies proof footer exists generally.
    // But proof page has its own "Copy Final Submission button".
    // Let's hide this footer on proof page or make it simple "Back to Step 8"
    if (location.pathname === PROOF_ROUTE) {
        return (
            <footer className="proof-footer">
                <div>Proof of Work Completed</div>
                <button onClick={() => navigate(STEPS[STEPS.length - 1].route)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={16} /> Back to Steps
                </button>
            </footer>
        );
    }

    if (!currentStep) return null;

    const artifactKey = `rb_step_${currentStep.number}_artifact`;
    const hasArtifact = artifacts[artifactKey];

    const isLastStep = currentStepIndex === STEPS.length - 1;
    const nextRoute = isLastStep ? PROOF_ROUTE : STEPS[currentStepIndex + 1].route;
    const prevRoute = currentStepIndex > 0 ? STEPS[currentStepIndex - 1].route : null;

    return (
        <footer className="proof-footer">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="status-badge" style={{ background: hasArtifact ? '#4CAF50' : '#ccc', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {hasArtifact ? <Check size={12} /> : <AlertCircle size={12} />}
                    {hasArtifact ? 'Verified' : 'Pending'}
                </div>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    {hasArtifact ? 'Artifact uploaded.' : 'Complete the build step to proceed.'}
                </span>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
                <button
                    className="btn-secondary"
                    onClick={() => prevRoute && navigate(prevRoute)}
                    disabled={!prevRoute}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: !prevRoute ? 0.5 : 1, cursor: !prevRoute ? 'default' : 'pointer' }}
                >
                    <ArrowLeft size={16} /> Previous
                </button>
                <button
                    className="btn-primary"
                    onClick={() => navigate(nextRoute)}
                    disabled={!hasArtifact}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: !hasArtifact ? 0.5 : 1, cursor: !hasArtifact ? 'not-allowed' : 'pointer' }}
                >
                    {isLastStep ? 'Finish & Proof' : 'Next Step'} <ArrowRight size={16} />
                </button>
            </div>
        </footer>
    );
};

export default ProofFooter;
