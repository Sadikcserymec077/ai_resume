import React from 'react';
import ResumePreview from '../components/resume/ResumePreview';

const PreviewPage = () => {
    return (
        <div className="preview-page" style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '64px',
            backgroundColor: 'var(--color-bg)',
            minHeight: 'calc(100vh - 64px)'
        }}>
            <ResumePreview />
        </div>
    );
};

export default PreviewPage;
