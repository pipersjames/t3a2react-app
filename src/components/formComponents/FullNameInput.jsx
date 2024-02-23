
export default function FullNameInput({edit , index, handleInputChange, formData}) {

  const value = formData && formData[index] !== undefined ? formData[index] : ''

  const handleFullNameChange = (event) => {
    const { value } = event.target
    handleInputChange(index, value)
     }

  return (
    <div>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={value || ''}
          onChange={handleFullNameChange}
          placeholder=""
          disabled={edit}
        />
        </div>
    </div>
  );
};

