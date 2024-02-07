import React from 'react';

const AccordionTable = () => {
  return (
    <div className="container mt-5">
        <div className="row justify-content-start"> {/* Align the row content to the left */}
            <div className="col-md-4"> {/* Take up 8 out of 12 columns */}
            <h3>Basic</h3>
            <ul>
                <li>Full Name</li>
                <li>Email</li>
                <li>Short answer</li>
                <li>Long answer</li>
                <li>Single choice</li>
                <li>Multiple choice</li>
                <li>File upload</li>
                <li>Date/Time</li>
            </ul>
            </div>
        </div>
    </div>
  );
};

export default AccordionTable;
