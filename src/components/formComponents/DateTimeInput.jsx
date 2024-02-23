
export default function DateTimeInput({edit, index, handleInputChange, formData}) {
  
  return (
    <div>
        <label>Date and Time:</label>
          <div>
            <input 
              type="datetime-local" 
              value={formData[index] || ''} 
              onChange={handleInputChange} 
              disabled={edit}
              />
          </div>
    </div>
  );
};

