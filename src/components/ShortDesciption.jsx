import React, { useState } from 'react';

const ShortDescription = ({ initialValue }) => {
  const [description, setDescription] = useState(initialValue || '');

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Function to handle adding or editing the description
  const handleSave = () => {
    // Here you can perform any validation or further processing if needed
    console.log("Description:", description);
  };

  return (
    <div className="form-group">
      <label htmlFor="description">Short Description:</label>
      <textarea
        className="form-control"
        id="description"
        value={description}
        onChange={handleDescriptionChange}
        rows="3"
        placeholder="Enter a short description"
      />
      <button className="btn btn-sm btn-primary mt-1" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ShortDescription;
