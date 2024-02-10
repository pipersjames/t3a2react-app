import React from 'react';

const FileUpload = ({ onAddComponent }) => {
    const handleClick = () => {
        onAddComponent('File Upload');
    };

    console.log("Rendering FileUpload component"); // Add this line

    return (
        <div
            className="file-upload-component"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <input type="file" />
            <button>Upload</button>
        </div>
    );
};

export default FileUpload;
