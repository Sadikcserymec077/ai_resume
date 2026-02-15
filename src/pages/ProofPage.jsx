import React, { useState } from 'react';
import { useStep } from '../contexts/StepContext';
import { STEPS } from '../constants/steps';

const ProofPage = () => {
    const { artifacts } = useStep();
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deploy: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLinks(prev => ({ ...prev, [name]: value }));
    };

    const isComplete = links.lovable && links.github && links.deploy;

    const handleCopySubmission = () => {
        const submission = `
Project 3: AI Resume Builder - Build Track
------------------------------------------
Lovable Link: ${links.lovable}
GitHub Repo: ${links.github}
Deployed App: ${links.deploy}

Steps Completed:
${STEPS.map(step => {
            const artifactKey = `rb_step_${step.number}_artifact`;
            const has = artifacts[artifactKey];
            return `- Step ${step.number}: ${has ? '[x] Completed' : '[ ] Pending'}`;
        }).join('\n')}
    `.trim();

        navigator.clipboard.writeText(submission);
        alert('Submission copied to clipboard!');
    };

    return (
        <div className="proof-page" style={{ padding: '0 24px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Submission Proof</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {STEPS.map(step => {
                    const artifactKey = `rb_step_${step.number}_artifact`;
                    const has = artifacts[artifactKey];
                    return (
                        <div key={step.id} style={{
                            padding: '16px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            background: has ? '#e8f5e9' : '#fff',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <div style={{ fontWeight: 'bold' }}>Step {step.number}</div>
                            <div style={{ fontSize: '14px' }}>{step.title}</div>
                            <div style={{
                                marginTop: 'auto',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: has ? '#4CAF50' : '#f44336'
                            }}>
                                {has ? '✓ Completed' : '⨯ Pending'}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ maxWidth: '600px', margin: '0 0' }}>
                <h3 style={{ marginBottom: '16px' }}>Project Links</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Lovable Project Link</label>
                        <input
                            type="url"
                            name="lovable"
                            placeholder="https://lovable.dev/..."
                            value={links.lovable}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>GitHub Repository</label>
                        <input
                            type="url"
                            name="github"
                            placeholder="https://github.com/..."
                            value={links.github}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>Deployment URL</label>
                        <input
                            type="url"
                            name="deploy"
                            placeholder="https://..."
                            value={links.deploy}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        className="btn-primary"
                        onClick={handleCopySubmission}
                        disabled={!isComplete} // Optional check
                        style={{ marginTop: '16px', width: '100%', opacity: !isComplete ? 0.7 : 1 }}
                    >
                        Copy Final Submission
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
