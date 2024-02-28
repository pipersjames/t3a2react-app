//import React, { useState } from 'react';

export default function FileUpload({edit , index, handleInputChange, formData, submittedFormData, action}) {

  const handleFileChange = (event) => {
    const { value } = event.target
    handleInputChange(index, value)
     }
    return (
        <div className="file-upload-component">
            <label>File Upload:</label>
            {action ? <p className="mt-2 border">{submittedFormData}</p>
          : <input 
                type="file"
                disabled={edit}
                onChange={handleFileChange}
            />
    }
        </div>
    );
};


