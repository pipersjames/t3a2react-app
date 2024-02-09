import React, { useState } from 'react';

const ShortDescription = ({ onChange }) => {
  const [description, setDescription] = useState('');

  // Function to handle description change
  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    // Pass the updated description to the parent component
    onChange(newDescription);
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
    </div>
  );
};

export default ShortDescription;
