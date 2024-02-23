
export default function EmailInput({edit , index, handleInputChange, formData}){

  return (
    <div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData[index] || ''}
          onChange={handleInputChange}
          placeholder=""
          disabled={edit}
        />
        </div>
    </div>
  );
};