import React, { useState } from 'react';

const EmailInput = ({ onEmailAdded }) => {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle adding the email when the user presses Enter
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // Emit a custom event to notify the parent component
        onEmailAdded(email);
        setEmail(''); // Clear the input after adding
      } else {
        alert('Please enter a valid email address.');
      }
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
        onKeyPress={handleKeyPress}
        placeholder="Enter your email"
      />
    </div>
  );
};

export default EmailInput;
