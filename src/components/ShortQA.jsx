import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ShortQA = ({ initialValue }) => {
  const [title, setTitle] = useState("Short Question");
  const [description, setDescription] = useState(initialValue || '');
  const [editMode, setEditMode] = useState(true); // Initially set to true to enable editing
  const maxCharacters = 28;

  // Function to handle title change
  const handleTitleChange = (event) => {
    if (editMode) setTitle(event.target.value);
  };

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    if (editMode) {
      const value = event.target.value;
      if (value.length <= maxCharacters) {
        setDescription(value);
      } else {
        // Truncate the description if it exceeds the character limit
        setDescription(value.slice(0, maxCharacters));
      }
    }
  };

  // Function to handle saving both title and description
  const handleSave = () => {
    // Here you can perform any validation or further processing if needed
    console.log("Title:", title);
    console.log("Description:", description);
    setEditMode(false); // Exit edit mode after saving
  };

  // Function to enable editing when the pencil icon is clicked
  const handleEditClick = () => {
    setEditMode(true);
  };

  return (
    <div className="form-group">
      {/* Input field for both title and description */}
      <div>
        <input
          className="form-control mb-2"
          value={title}
          onChange={handleTitleChange}
          disabled={!editMode} // Disable editing if not in edit mode
          autoFocus // Focus the input field on initial render
        />
        <textarea
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
          placeholder="Enter a short description"
          disabled={!editMode} // Disable editing if not in edit mode
        />
      </div>
      {/* Show Save button when in edit mode */}
      {editMode && (
        <button className="btn btn-sm btn-primary mt-1 mr-2" onClick={handleSave}>
          Save
        </button>
      )}
      {/* Show pencil icon to enable editing */}
      {!editMode && (
        <FontAwesomeIcon icon={faPencilAlt} className="text-muted ml-2" onClick={handleEditClick} />
      )}
    </div>
  );
};

export default ShortQA;
