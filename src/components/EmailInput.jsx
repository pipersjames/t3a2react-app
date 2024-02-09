import React, { useState } from 'react';

const EmailInput = () => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAdd = () => {
    // Check if the input value is a valid email address
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Emit a custom event to notify the parent component
      const event = new CustomEvent('emailAdded', { detail: email });
      document.dispatchEvent(event);
      setEmail(''); // Clear the input after adding
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={handleChange}
        placeholder="Enter your email"
      />
      <button className="btn btn-sm btn-primary mt-1" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default EmailInput;
