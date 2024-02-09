import React from 'react';

const EmailInput = ({ value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={value}
        onChange={onChange}
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
