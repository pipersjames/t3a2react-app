import React, { useState, useEffect } from 'react';
import Layout from '../components/layouts/Layout';
import AccordionTable from '../components/AccordionTable';
import FullNameInput from '../components/FullNameInput'; // Import FullNameInput component

const FormBuilder = () => {
  // State variables for form name, list of usernames, and accordion items
  const [formName, setFormName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [accordionItems, setAccordionItems] = useState([]);
  const [formComponents, setFormComponents] = useState([]); // State to store form components
  const [assignedTo, setAssignedTo] = useState(''); // State for assignedTo input value

  // useEffect hook to fetch usernames from the database
  useEffect(() => {
    fetchUsernamesFromDatabase()
      .then((data) => {
        setUsernames(data);
        setAccordionItems([
          'Full Name',
          'Email',
          'Short answer',
          'Long answer',
          'Single choice',
          'Multiple choice',
          'File upload',
          'Date/Time'
        ]);
      })
      .catch((error) => console.error('Error fetching usernames:', error));
  }, []);

  // Function to handle form name input change
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  // Function to handle full name input change
  const handleFullNameChange = (event) => {
    // Handle changes in the FullNameInput component
  };

  // Function to handle username input change
  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const fetchUsernamesFromDatabase = async () => {
    return ['user1', 'user2', 'user3'];
  };

  // Function to handle adding a component to the form
  const handleAddComponent = (componentName) => {
    // Determine the component type based on the component name
    let componentType;
    switch (componentName) {
      case 'Full Name':
        componentType = FullNameInput;
        break;
      // Add cases for other components as needed
      default:
        console.error(`Component type for "${componentName}" not found.`);
        return;
    }

    // Check if the component is already added
    if (!formComponents.some((comp) => comp.type === componentType)) {
      // Add component to formComponents array
      setFormComponents([...formComponents, { type: componentType, key: formComponents.length }]);
    }
  };

  // Function to handle deleting a component from the form
  const handleDeleteComponent = (index) => {
    setFormComponents(formComponents.filter((_, i) => i !== index));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const componentType = event.dataTransfer.getData("text/plain");
    handleAddComponent(componentType);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Filter usernames based on the assignedTo input value
  const filteredUsernames = usernames.filter(username =>
    username.toLowerCase().includes(assignedTo.toLowerCase())
  );

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {/* Pass handleAddComponent as a prop to AccordionTable */}
            <AccordionTable items={accordionItems} onItemClick={handleAddComponent} />
          </div>
          <div className="col-md-9" onDrop={handleDrop} onDragOver={handleDragOver}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="formName">Form Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="formName"
                    value={formName}
                    onChange={handleFormNameChange}
                  />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-group">
                  <label htmlFor="assignedTo">Assigned To:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="assignedTo"
                    value={assignedTo}
                    onChange={handleAssignedToChange}
                    list="usernamesList"
                  />
                  {/* Render a datalist for the filtered usernames */}
                  <datalist id="usernamesList">
                    {filteredUsernames.map((username, index) => (
                      <option key={index} value={username} />
                    ))}
                  </datalist>
                </div>
              </div>
              {/* Render added form components */}
              {formComponents.map((component, index) => (
                <div key={index} className="col-md-6 mb-3">
                  {/* Render the component */}
                  {React.createElement(component.type, { key: component.key, onChange: handleFullNameChange })}
                  {/* Render delete button for each component */}
                  <button className="btn btn-sm btn-primary mt-1" onClick={() => handleDeleteComponent(index)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormBuilder;
