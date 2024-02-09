import React from 'react';

const EmailInput = ({ onDragStart }) => {
  const handleDragStart = (event) => {
    onDragStart(event, 'Email');
  };

  return (
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        draggable
        onDragStart={handleDragStart}
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
