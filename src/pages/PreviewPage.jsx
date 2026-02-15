import React from 'react';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateTabs from '../components/resume/TemplateTabs';

const PreviewPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
            {/* Template Tabs */}
            <TemplateTabs />

            {/* Full Preview */}
            <div className="preview-page" style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '64px',
                backgroundColor: 'var(--color-bg)',
                flex: 1
            }}>
                <ResumePreview />
            </div>
        </div>
    );
};

export default PreviewPage;
