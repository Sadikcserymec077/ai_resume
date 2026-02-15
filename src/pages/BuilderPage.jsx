import React from 'react';
import BuilderForm from '../components/resume/BuilderForm';
import ResumePreview from '../components/resume/ResumePreview';
import ATSScore from '../components/resume/ATSScore';

const BuilderPage = () => {
    return (
        <div className="builder-page" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            height: 'calc(100vh - 64px)',
            overflow: 'hidden'
        }}>
            {/* Scrollable Form Area */}
            <div className="form-area" style={{
                overflowY: 'auto',
                borderRight: '1px solid var(--color-border)',
                backgroundColor: '#fff'
            }}>
                <BuilderForm />
            </div>

            {/* Preview + ATS Score Area */}
            <div className="preview-area" style={{
                backgroundColor: 'var(--color-bg)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                overflowY: 'auto'
            }}>
                {/* ATS Score Panel */}
                <ATSScore />

                {/* Live Resume Preview */}
                <div style={{
                    transform: 'scale(0.75)',
                    transformOrigin: 'top center',
                    width: '133%',     /* compensate for 0.75 scale */
                    marginLeft: '-16.5%',
                    maxWidth: '133%'
                }}>
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
};

export default BuilderPage;
