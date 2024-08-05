import React from 'react';
import '../Logo.css';
import logo from '../ashot.jpg';

const Logo = () => {
    return (
        <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
        </div>
    );
};

export default Logo;
