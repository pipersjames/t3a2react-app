import React, { useState } from 'react';

export default function FullNameInput({ edit }) {
  const [fullName, setFullName] = useState('');

  const editMode = edit

  const handleChange = (event) => {
    setFullName(event.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={fullName}
          onChange={handleChange}
          placeholder=""
          disabled={editMode}
        />
        </div>
    </div>
  );
};

