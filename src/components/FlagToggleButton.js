import React, { useState } from 'react';

const buttonContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '25px',
    overflow: 'hidden',
    cursor: 'pointer',
};

const labelStyles = (active) => ({
    padding: '10px',
    background: active ? '#007BFF' : '#fff',
    color: active ? '#fff' : '#000',
    transition: 'background 0.3s, color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
});

const FlagToggleButton = ({ changeLanguage }) => {

    return (
        <div >
            <button onClick={changeLanguage}>🇺🇸 - 🇮🇱</button>
        </div>
    );
};

export default FlagToggleButton;
