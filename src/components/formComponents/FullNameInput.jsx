
export default function FullNameInput({edit , index, handleInputChange, formData}) {

  return (
    <div>
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          className="form-control"
          id="fullName"
          value={formData[index] || ''}
          onChange={handleInputChange}
          placeholder=""
          disabled={edit}
        />
        </div>
    </div>
  );
};

