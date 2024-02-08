import React from 'react';

const AccordionTable = ({ items, onItemClick }) => {
  const handleDragStart = (event, item) => {
    event.dataTransfer.setData("text/plain", item);
  };

  return (
    <div className="d-inline-block border p-3 mb-5">
      <h3 className="mb-4">Basic</h3>
      <ul>
        {items.map((item, index) => (
          <li 
            key={index} 
            draggable 
            onDragStart={(event) => handleDragStart(event, item)} 
            style={{ cursor: 'grab' }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionTable;
