import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 64px)',
            textAlign: 'center',
            backgroundColor: 'var(--color-bg)',
            gap: '32px'
        }}>
            <h1 style={{
                fontSize: '48px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-text)',
                maxWidth: '600px',
                lineHeight: '1.2'
            }}>
                Build a Resume That Gets Read.
            </h1>
            <button
                className="btn-primary"
                onClick={() => navigate('/builder')}
                style={{ fontSize: '18px', padding: '16px 32px' }}
            >
                Start Building
            </button>
        </div>
    );
};

export default HomePage;
