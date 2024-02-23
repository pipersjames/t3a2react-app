//import React, { useState } from 'react';

export default function FileUpload({edit , index, handleInputChange, formData}) {
   
    return (
        <div className="file-upload-component">
            <label>File Upload:</label>
            <input 
                type="file"
                disabled={edit}
                //onChange={handleFileChange}
            />
        </div>
    );
};


