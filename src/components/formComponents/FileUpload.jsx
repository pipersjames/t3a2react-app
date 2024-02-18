//import React, { useState } from 'react';

export default function FileUpload({ edit }) {
   
    // will be needed for file handling to the server
    // const [selectedFile, setSelectedFile] = useState(null)

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0])
    // }

    const editMode = edit

    return (
        <div className="file-upload-component">
            <label>File Upload:</label>
            <input 
                type="file"
                disabled={editMode}
                //onChange={handleFileChange}
            />
        </div>
    );
};


