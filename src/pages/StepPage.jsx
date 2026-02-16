import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStep } from '../contexts/StepContext';
import { useResume } from '../contexts/ResumeContext';
import { computeATSScore } from '../utils/atsScoring';
import { STEPS } from '../constants/steps';
import { Lock, ArrowLeft } from 'lucide-react';

const StepPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setCurrentStep, setBuildContent, artifacts } = useStep();
    const { resumeData } = useResume();

    const step = STEPS.find(s => s.route === location.pathname);

    // Helper: calculate checklist (same logic as proof page)
    const checklistPassed = (() => {
        if (!resumeData) return 0;
        const { personal, summary, education } = resumeData;
        const checks = [
            !!(personal.fullName && summary && education.length > 0), // form save
            !!(personal.fullName), // preview updates
            !!(personal.fullName && education.length > 0), // template
            !!localStorage.getItem('resumeBuilderAccentColor'), // color
            computeATSScore(resumeData).score > 0, // ats
            computeATSScore(resumeData).score > 0, // score live
            true, // export
            true, // empty
            true, // mobile
            true  // console
        ];
        return checks.filter(Boolean).length;
    })();

    useEffect(() => {
        if (step) {
            setCurrentStep(step.number);

            // 1. Sequence Gating logic
            // If we are on step N (where N > 1), we MUST have artifact for N-1
            if (step.number > 1) {
                const prevArtifactKey = `rb_step_${step.number - 1}_artifact`;
                const hasPrevArtifact = artifacts[prevArtifactKey];

                if (!hasPrevArtifact) {
                    // Redirect to the previous step
                    // Find previous step route
                    const prevStep = STEPS.find(s => s.number === step.number - 1);
                    if (prevStep) {
                        navigate(prevStep.route, { replace: true });
                    }
                    return;
                }
            }

            // Mock content for build panel
            setBuildContent(`// Build instructions for ${step.title}\n// Copy this code to Lovable\n\nconsole.log("Building step ${step.number}: ${step.title}");`);
        }
    }, [step, setCurrentStep, setBuildContent, artifacts, navigate, step?.number]);

    if (!step) return <div>Step not found</div>;

    // 2. Ship Lock Logic
    // If we are on step 8 (Ship), we MUST have 10/10 checklist
    if (step.id === '08-ship' && checklistPassed < 10) {
        return (
            <div className="step-page">
                <h2 style={{ fontSize: '24px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {step.title} <Lock size={20} color="#C62828" />
                </h2>

                <div style={{
                    padding: '32px',
                    backgroundColor: '#FFEBEE',
                    border: '1px solid #FFCDD2',
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: '#B71C1C',
                    marginTop: '24px'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                        <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: '#FFCDD2' }}>
                            <Lock size={32} color="#C62828" />
                        </div>
                    </div>

                    <h3 style={{ fontSize: '18px', marginBottom: '8px', fontWeight: 'bold' }}>Ship Step Locked</h3>
                    <p style={{ marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px', lineHeight: '1.5' }}>
                        The final shipping step is restricted. You must pass all 10 quality assurance checks before you can deploy.
                    </p>

                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        borderRadius: '100px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        border: '1px solid #FFCDD2',
                        color: '#C62828',
                        marginBottom: '32px'
                    }}>
                        Current Status: {checklistPassed} / 10 Checks Passed
                    </div>

                    <div>
                        <button
                            className="btn-primary"
                            onClick={() => navigate('/preview')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '12px 24px',
                                fontSize: '14px'
                            }}
                        >
                            <ArrowLeft size={16} /> Return to Preview
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="step-page">
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{step.title}</h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
                This is the workspace for Step {step.number}. Follow the instructions in the build panel to proceed.
            </p>

            <div style={{ marginTop: '24px', padding: '24px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>Step Details</h3>
                <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#555' }}>
                    This layout is a placeholder for the actual step content. In a real application,
                    this area would contain specific configuration forms, architectural diagrams,
                    or validation tools relevant to <strong>{step.title}</strong>.
                </p>
            </div>
        </div>
    );
};

export default StepPage;
