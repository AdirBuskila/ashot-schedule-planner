import React from 'react';

const FlagToggleButton = ({ changeLanguage }) => {
    return (
        <div className="flag-toggle-button-container">
            <button className="flag-toggle-button" onClick={changeLanguage}>
                🇺🇸 - 🇮🇱
            </button>
        </div>
    );
};

export default FlagToggleButton;
