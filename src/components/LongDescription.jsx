import React, { useState } from 'react';

const LongDescription = ({ initialValue }) => {
  const [description, setDescription] = useState(initialValue || '');
  const [editMode, setEditMode] = useState(true); // State to control edit mode

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Function to handle saving the description
  const handleSave = () => {
    // Here you can perform any validation or further processing if needed
    console.log("Description:", description);
    setEditMode(false); // Exit edit mode after saving
  };

  // Function to handle editing the description
  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
  };

  return (
    <div className="form-group">
      <label htmlFor="description">Short Description:</label>
      {editMode ? (
        // Input field in edit mode
        <textarea
          className="form-control"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
          placeholder="Enter a short description"
        />
      ) : (
        // Display description in non-edit mode
        <div>{description}</div>
      )}
      {/* Show Save button in edit mode */}
      {editMode && (
        <button className="btn btn-sm btn-primary mt-1" onClick={handleSave}>
          Save
        </button>
      )}
      {/* Show Edit button in non-edit mode */}
      {!editMode && (
        <button className="btn btn-sm btn-primary mt-1" onClick={handleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default LongDescription;
