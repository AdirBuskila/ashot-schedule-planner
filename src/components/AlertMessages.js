// src/components/AlertMessages.js
import React from 'react';

const AlertMessages = ({ messages }) => (


    <div className="alert-messages">
        <h3>Alert Messages</h3>
        {messages.length > 0 ? (
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        ) : (
            <p>No issues detected.</p>
        )}
    </div>
);

export default AlertMessages;
