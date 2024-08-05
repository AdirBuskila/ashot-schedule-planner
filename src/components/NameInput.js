// src/components/NameInput.js
import React, { useState } from 'react';

const NameInput = ({ onNamesSubmit }) => {
  const [names, setNames] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameArray = names.split(',').map(name => name.trim());
    onNamesSubmit(nameArray);
  };

  return (
    <form className="name-input-form" onSubmit={handleSubmit}>
      <label className="name-input-label">
        Enter guard names (comma-separated):
        <input
          className="name-input-field"
          type="text"
          placeholder="Adir, Ofir, Shahar"
          value={names}
          onChange={(e) => setNames(e.target.value)}
        />
      </label>
      <button className="name-input-button" type="submit">Submit</button>
    </form>
  );
};

export default NameInput;
