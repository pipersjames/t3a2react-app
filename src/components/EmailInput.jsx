import React, { useState } from 'react';

const EmailInput = ({ onEmailAdded }) => {
  const [email, setEmail] = useState('');
  const [editMode, setEditMode] = useState(true); // State to control edit mode
  const [emailList, setEmailList] = useState([]);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  // Handle adding or editing the email
  const handleAdd = () => {
    // Check if the input value is a valid email address
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // If in edit mode and there's an existing email, replace it
      if (!editMode && emailList.length > 0) {
        setEmailList([email]);
      } else {
        // Otherwise, add the email to the list
        setEmailList([email]);
      }
      setEmail(''); // Clear the input after adding or editing
      setEditMode(false); // Exit edit mode after adding or editing
      onEmailAdded(email); // Notify parent component
    } else {
      alert('Please enter a valid email address.');
    }
  };

  // Handle editing the email
  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
    // If there's an existing email, set it in the input field for editing
    if (emailList.length > 0) {
      setEmail(emailList[0]);
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
          disabled={!editMode} // Disable input when not in edit mode
        />
      </div>
      {editMode && (
        <button className="btn btn-sm btn-primary mt-1" onClick={handleAdd}>
          Add
        </button>
      )}
      {!editMode && (
        <div className="form-group">
          <div>{emailList[0]}</div>
          <button className="btn btn-sm btn-primary mt-1" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailInput;
