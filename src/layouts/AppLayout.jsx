import React from 'react';
import AppTopBar from '../components/common/AppTopBar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div className="premium-layout-container" style={{ display: 'block', height: '100vh', overflowX: 'hidden' }}>
            <AppTopBar />
            <div className="main-content" style={{ marginTop: '0px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
