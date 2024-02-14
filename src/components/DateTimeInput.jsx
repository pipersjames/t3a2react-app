import React, { useState } from 'react';

const DateTimeInput = ({ onAddComponent }) => {
  const [dateTime, setDateTime] = useState('');

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleAddOrUpdateComponent = () => {
    if (dateTime.trim() !== '') {
      // Pass the selected date/time value to the parent component
      onAddComponent('Date/Time', dateTime);
    }
  };

  return (
    <div>
      <label>Date/Time of Incident:</label>
      <input type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
      <button onClick={handleAddOrUpdateComponent}>Add/Update</button>
    </div>
  );
};

export default DateTimeInput;
