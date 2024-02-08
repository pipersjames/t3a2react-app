import React from 'react';

const FullNameInput = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="fullName">Full Name:</label>
      <input
        type="text"
        className="form-control"
        id="fullName"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FullNameInput;
