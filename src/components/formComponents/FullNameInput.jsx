import React, { useState } from 'react';
import Label from './Label';

export default function FullNameInput({ edit }) {
  const [fullName, setFullName] = useState('');

  const editMode = edit

  const handleChange = (event) => {
    setFullName(event.target.value);
  };

  return (
    <div>
      <div className="form-group">
        <Label Tag='fullName' label='Full Name:'/>
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

