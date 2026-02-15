import React, { useState, useEffect } from 'react';
import { useStep } from '../../contexts/StepContext';

const BuildPanel = () => {
    const { buildContent, updateArtifact, artifacts, currentStep } = useStep();
    const [screenshot, setScreenshot] = useState('');
    const [status, setStatus] = useState('pending'); // pending, success, error

    // Reset state when step changes
    useEffect(() => {
        setScreenshot('');
        setStatus('pending');
    }, [currentStep]);

    const handleCopy = () => {
        navigator.clipboard.writeText(buildContent);
        // Could show toast here
    };

    const handleItWorked = () => {
        setStatus('success');
    };

    const handleError = () => {
        setStatus('error');
    };

    const handleScreenshotChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Create a fake URL for now or just store name
            // In a real app, upload to storage. Here, we simulate.
            const url = URL.createObjectURL(file);
            setScreenshot(url);

            // Save artifact on upload
            if (currentStep) {
                updateArtifact(currentStep, url); // Saving URL as artifact
            }
        }
    };

    if (!currentStep) return <div className="p-4">Select a step to view build instructions.</div>;

    const artifactKey = `rb_step_${currentStep}_artifact`;
    const hasArtifact = artifacts && artifacts[artifactKey];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
            <div>
                <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>Build Instructions</h3>
                <div style={{ position: 'relative' }}>
                    <textarea
                        readOnly
                        value={buildContent}
                        style={{
                            height: '200px',
                            resize: 'none',
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            marginBottom: '8px'
                        }}
                    />
                    <button
                        className="btn-secondary"
                        onClick={handleCopy}
                        style={{ width: '100%' }}
                    >
                        Copy Code
                    </button>
                </div>
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                    href="https://lovable.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
                >
                    Build in Lovable
                </a>

                {status === 'pending' && !hasArtifact && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="btn-secondary"
                            onClick={handleItWorked}
                            style={{ flex: 1, borderColor: '#4CAF50', color: '#4CAF50' }}
                        >
                            It Worked
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={handleError}
                            style={{ flex: 1, borderColor: '#f44336', color: '#f44336' }}
                        >
                            Error
                        </button>
                    </div>
                )}

                {(status === 'success' || hasArtifact) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <div style={{ color: '#4CAF50', fontWeight: 'bold' }}>Build Successful!</div>
                        {!hasArtifact && (
                            <label className="btn-secondary" style={{ cursor: 'pointer', width: '100%', textAlign: 'center' }}>
                                Add Screenshot
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleScreenshotChange}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                        {hasArtifact && (
                            <div style={{ fontSize: '12px', color: '#666' }}>Artifact saved.</div>
                        )}
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ color: '#f44336', fontSize: '14px' }}>
                        Please check the errors in Lovable and try again.
                        <button onClick={() => setStatus('pending')} style={{ marginLeft: '8px', textDecoration: 'underline', background: 'none' }}>Retry</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuildPanel;
