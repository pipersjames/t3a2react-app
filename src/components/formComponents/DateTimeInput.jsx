import React, { useState } from 'react';

export default function DateTimeInput({edit}) {
   const [dateTime, setDateTime] = useState('');

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const editMode = edit

  return (
    <div>
        <label>Date and Time:</label>
          <div>
            <input 
              type="datetime-local" 
              value={dateTime} 
              onChange={handleDateTimeChange} 
              disabled={editMode}
              />
          </div>
    </div>
  );
};

