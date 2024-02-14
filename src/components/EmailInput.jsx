import React, { useState } from 'react';

const EmailInput = ({ onEmailAdded }) => {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle adding the email when the user presses Enter
  const handleAdd = () => {
    // Check if the input value is a valid email address
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Add the email to the list
      setEmailList([...emailList, email]);
      setEmail(''); // Clear the input after adding
    } else {
      alert('Please enter a valid email address.');
    }
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
          placeholder="Enter your email"
        />
      </div>
      <button className="btn btn-sm btn-primary mt-1" onClick={handleAdd}>Add</button>
      {/* Display the list of entered email addresses */}
      <div>
        {emailList.map((email, index) => (
          <div key={index}>{email}</div>
        ))}
      </div>
    </div>
  );
};

export default EmailInput;
