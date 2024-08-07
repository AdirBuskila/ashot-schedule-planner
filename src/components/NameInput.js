// src/components/NameInput.js
import React, { useState } from 'react';
import { content } from '../i8';


const NameInput = ({ onNamesSubmit, i8 }) => {
  const [names, setNames] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameArray = names.split(',').map(name => name.trim());
    onNamesSubmit(nameArray);
  };

  return (
    <form className="name-input-form" onSubmit={handleSubmit}>
      <label className="name-input-label">
        {content[i8].enterNames}
        <input
          className="name-input-field"
          type="text"
          placeholder={content[i8].namePlaceholder}
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
      </label>
      <button className="name-input-button" type="submit">{content[i8].submit}</button>
    </form>
  );
};

export default NameInput;
