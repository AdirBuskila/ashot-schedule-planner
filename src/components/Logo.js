import React, { useState } from 'react';
import '../styles/Logo.css';
import logo from '../ashot.jpg';

const Logo = () => {
    const [speed, setSpeed] = useState(5); // initial speed in seconds

    const handleLogoClick = () => {
        setSpeed(prevSpeed => Math.max(1, prevSpeed - 1)); // decrease speed to make it faster, minimum speed of 1s
    };

    return (
        <div className="logo-container" onClick={handleLogoClick}>
            <img src={logo} alt="Logo" className="logo" style={{ animationDuration: `${speed}s` }} />
        </div>
    );
};

export default Logo;
