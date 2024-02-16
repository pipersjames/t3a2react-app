import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ShortDescription = ({ initialValue }) => {
  const [title, setTitle] = useState("Short Description");
  const [description, setDescription] = useState(initialValue || '');
  const [editMode, setEditMode] = useState(true); // Initially set to true to enable editing

  // Function to handle title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Function to handle saving both title and description
  const handleSave = () => {
    // Here you can perform any validation or further processing if needed
    console.log("Title:", title);
    console.log("Description:", description);
    setEditMode(false); // Exit edit mode after saving
  };

  return (
    <div className="form-group">
      {/* Input field for both title and description */}
      <div>
        <input
          className="form-control mb-2"
          value={title}
          onChange={handleTitleChange}
          autoFocus // Focus the input field on initial render
        />
        <textarea
          className="form-control"
          value={description}
          onChange={handleDescriptionChange}
          rows="3"
          placeholder="Enter a short description"
        />
      </div>
      {/* Always show Save button when in edit mode */}
      {editMode && (
        <button className="btn btn-sm btn-primary mt-1 mr-2" onClick={handleSave}>
          Save
        </button>
      )}
      {/* Show pencil icon to toggle edit mode */}
      <FontAwesomeIcon icon={faPencilAlt} className="text-muted ml-2" onClick={() => setEditMode(true)} />
    </div>
  );
};

export default ShortDescription;
