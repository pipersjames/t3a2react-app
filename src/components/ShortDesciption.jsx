import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ShortDescription = ({ initialValue }) => {
  const [description, setDescription] = useState(initialValue || '');
  const [editMode, setEditMode] = useState(false); // State to control edit mode
  const [title, setTitle] = useState("Short Description"); // State to control title

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    if (!editMode) {
      setEditMode(true); // Enable edit mode when user starts typing
    }
  };

  // Function to handle title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle saving the description
  const handleSave = () => {
    // Here you can perform any validation or further processing if needed
    console.log("Title:", title);
    console.log("Description:", description);
    setEditMode(false); // Exit edit mode after saving
  };

  // Function to handle double click on title to enter edit mode
  const handleTitleDoubleClick = () => {
    setEditMode(true);
  };

  // Function to handle clicking the add/save button
  const handleAddSaveClick = () => {
    // Save description when in edit mode
    handleSave();
  };

  // Effect to set initial description when initialValue changes
  useEffect(() => {
    if (initialValue && !description) {
      setDescription(initialValue);
    }
  }, [initialValue, description]);

  return (
    <div className="form-group">
      {editMode ? (
        // Input field for title in edit mode
        <input
          className="form-control"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleSave}
        />
      ) : (
        // Display title in non-edit mode with hover effect
        <div className="d-flex align-items-center">
          <label
            className="editable-title mr-2"
            onDoubleClick={handleTitleDoubleClick}
            tabIndex={0} // Ensure the label is focusable
          >
            {title}
          </label>
          <FontAwesomeIcon icon={faPencilAlt} className="text-muted ml-2" onClick={handleTitleDoubleClick} />
        </div>
      )}
      <br />
      {/* Show textarea for description */}
      <textarea
        className="form-control"
        value={description}
        onChange={handleDescriptionChange}
        rows="3"
        placeholder="Enter a short description"
        disabled={!editMode} // Disable textarea when not in edit mode
      />
      {/* Show Save button */}
      <button className="btn btn-sm btn-primary mt-1 mr-2" onClick={handleAddSaveClick}>
        Save
      </button>
    </div>
  );
};

export default ShortDescription;
