import React from 'react';

const AccordionTable = ({ items, onItemClick }) => {
  return (
    <div className="d-inline-block border p-3 mb-5">
      <h3 className="mb-4">Basic</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={() => onItemClick(item)} style={{ cursor: 'pointer' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionTable;
