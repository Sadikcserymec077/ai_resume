import React from 'react';
import { NavLink } from 'react-router-dom';

const TopBar = () => {
    return (
        <header className="top-bar">
            <div className="top-bar-left">
                <h1 style={{ fontSize: '18px', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>
                    AI Resume Builder
                </h1>
            </div>
            <div className="top-bar-center" style={{ display: 'flex', gap: '24px' }}>
                <NavLink
                    to="/builder"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    style={({ isActive }) => ({
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? '600' : '400',
                        textDecoration: 'none',
                        borderBottom: isActive ? '2px solid var(--color-accent)' : 'none',
                        paddingBottom: '4px'
                    })}
                >
                    Builder
                </NavLink>
                <NavLink
                    to="/preview"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    style={({ isActive }) => ({
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? '600' : '400',
                        textDecoration: 'none',
                        borderBottom: isActive ? '2px solid var(--color-accent)' : 'none',
                        paddingBottom: '4px'
                    })}
                >
                    Preview
                </NavLink>
                <NavLink
                    to="/proof"
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    style={({ isActive }) => ({
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? '600' : '400',
                        textDecoration: 'none',
                        borderBottom: isActive ? '2px solid var(--color-accent)' : 'none',
                        paddingBottom: '4px'
                    })}
                >
                    Proof
                </NavLink>
            </div>
            <div className="top-bar-right">
                <div style={{ fontSize: '12px', fontWeight: '500', color: '#666' }}>v1.0.0</div>
            </div>
        </header>
    );
};

export default TopBar;
