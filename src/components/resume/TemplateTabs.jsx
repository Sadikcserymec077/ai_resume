import React from 'react';
import { useResume } from '../../contexts/ResumeContext';

const TEMPLATES = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' }
];

const TemplateTabs = () => {
    const { template, setTemplate } = useResume();

    return (
        <div style={{
            display: 'flex',
            gap: '0',
            borderBottom: '1px solid var(--color-border)',
            backgroundColor: '#fff',
            padding: '0 24px'
        }}>
            {TEMPLATES.map(t => {
                const isActive = template === t.id;
                return (
                    <button
                        key={t.id}
                        onClick={() => setTemplate(t.id)}
                        style={{
                            padding: '12px 20px',
                            fontSize: '13px',
                            fontWeight: isActive ? '600' : '400',
                            color: isActive ? 'var(--color-text)' : 'var(--color-text-secondary)',
                            backgroundColor: 'transparent',
                            borderBottom: isActive ? '2px solid var(--color-text)' : '2px solid transparent',
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderRadius: '0',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            fontFamily: 'var(--font-sans)',
                            letterSpacing: '0.02em'
                        }}
                    >
                        {t.label}
                    </button>
                );
            })}
        </div>
    );
};

export default TemplateTabs;
