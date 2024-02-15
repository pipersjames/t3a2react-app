import React, { useState } from 'react';

const DateTimeInput = ({ initialValue, onAddComponent }) => {
  const [dateTime, setDateTime] = useState(initialValue || '');
  const [editMode, setEditMode] = useState(initialValue ? false : true);

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleAddOrUpdateComponent = () => {
    if (dateTime.trim() !== '') {
      onAddComponent('Date/Time', dateTime);
      setEditMode(false); // Exit edit mode after adding or updating
    }
  };

  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
  };

  return (
    <div>
      {editMode ? (
        <div>
          <label>Date/Time of Incident:</label>
          <div>
            <input type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
          </div>
          <div style={{ marginTop: '10px' }}> {/* Add margin-top for spacing */}
            <button onClick={handleAddOrUpdateComponent}>Add</button>
          </div>
        </div>
      ) : (
        <div>
          <label>Date/Time of Incident:</label>
          <span>{dateTime}</span>
          <div style={{ marginTop: '10px' }}> {/* Add margin-top for spacing */}
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeInput;
