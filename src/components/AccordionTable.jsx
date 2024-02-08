import React from 'react';

const AccordionTable = ({ items }) => {
  return (
    <div className="d-inline-block border p-3 mb-5"> {/* Use d-inline-block class */}
      <h3 className="mb-4">Basic</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionTable;
