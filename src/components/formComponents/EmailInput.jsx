import React, { useState } from 'react';

export default function EmailInput({ edit }){
  const [email, setEmail] = useState('');

  const editMode = edit

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={handleChange}
          placeholder=""
          disabled={editMode}
        />
        </div>
    </div>
  );
};