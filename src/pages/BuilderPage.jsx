import React from 'react';
import BuilderForm from '../components/resume/BuilderForm';
import ResumePreview from '../components/resume/ResumePreview';

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

            {/* Preview Area */}
            <div className="preview-area" style={{
                backgroundColor: 'var(--color-bg)',
                padding: '32px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflowY: 'auto'
            }}>
                <div style={{ transform: 'scale(0.8)', transformOrigin: 'top center', width: '100%', maxWidth: '800px' }}>
                    <ResumePreview />
                </div>
            </div>
        </div>
    );
};

export default BuilderPage;
