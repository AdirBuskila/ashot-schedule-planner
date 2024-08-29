import React, { useState } from 'react';
import { content } from '../i8';

const NameInput = ({ onNamesSubmit, i8 }) => {
  const [names, setNames] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split and trim names, then filter out any empty strings
    const nameArray = names
      .split(',')
      .map(name => name.trim())
      .filter(name => name !== '');

    if (nameArray.length === 0) {
      setError(content[i8].enterNames); // Set error message if no valid names
      return;
    }

    setError(null); // Clear any previous error
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
      {error && <p className="error-message">{error}</p>}
      <button className="name-input-button" type="submit">{content[i8].submit}</button>
    </form>
  );
};

export default NameInput;
