import React from 'react';

const AlertMessages = ({ messages, i8 }) => {
    const getClassName = (message) => {
        return message.includes('FAILED') ? 'alert-failed' : 'alert-problem';
    };

    return (
        <div className="alert-messages">
            <h3>{i8 === 'EN' ? 'Alert Messages' : 'הודעות התראה'}</h3>
            <ul>
                {messages.map((message, index) => (
                    <li key={index} className={getClassName(message)}>
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertMessages;
