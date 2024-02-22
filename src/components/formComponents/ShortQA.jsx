import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ShortQA = ({ setQuestionHeaders, edit , fill, index}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('');
  const [editMode, setEditMode] = useState(edit);
  const maxCharacters = 28;

  // Function to handle title change
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
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
    setEditMode(false); // Exit edit mode after saving
    setQuestionHeaders((prevHeaders) => ({...prevHeaders, [index]: title}));
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
          placeholder='Enter Question Here'
          onChange={handleTitleChange}
          disabled={!editMode} // Disable editing if not in edit mode
        />
        {!editMode && (
          <input
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
            rows="3"
            placeholder="Answer Area"
            disabled={!fill} 
          />
        )}
      </div>
      {/* Show Save button when in edit mode */}
      {editMode && (
        <button className="btn btn-sm btn-primary mt-1 mr-2" onClick={handleSave}>
          Save
        </button>
      )}
      {/* Show pencil icon to enable editing */}
      {!editMode && !fill && (
        <FontAwesomeIcon icon={faPencilAlt} className="text-muted ml-2" onClick={handleEditClick} />
      )}
    </div>
  );
};

export default ShortQA;
