import React, { useState } from 'react';

const FullNameInput = ({ onFullNameAdded }) => {
  const [fullName, setFullName] = useState('');
  const [editMode, setEditMode] = useState(true); // State to control edit mode
  const [fullNameList, setFullNameList] = useState([]);

  const handleChange = (event) => {
    setFullName(event.target.value);
  };

  // Handle adding or editing the full name
  const handleAdd = () => {
    // Check if the input value is not empty
    if (fullName.trim() !== '') {
      // If in edit mode and there's an existing full name, replace it
      if (!editMode && fullNameList.length > 0) {
        setFullNameList([fullName]);
      } else {
        // Otherwise, add the full name to the list
        setFullNameList([fullName]);
      }
      setFullName(''); // Clear the input after adding or editing
      setEditMode(false); // Exit edit mode after adding or editing
      onFullNameAdded(fullName); // Notify parent component
    } else {
      alert('Please enter a full name.');
    }
  };

  // Handle editing the full name
  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
    // If there's an existing full name, set it in the input field for editing
    if (fullNameList.length > 0) {
      setFullName(fullNameList[0]);
    }
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
          placeholder="Enter your full name"
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
          <div>{fullNameList[0]}</div>
          <button className="btn btn-sm btn-primary mt-1" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default FullNameInput;
