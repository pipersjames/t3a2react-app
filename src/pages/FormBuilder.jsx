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

  // Function to handle username select change
  const handleUsernameSelectChange = (event) => {
    console.log('Selected username:', event.target.value);
  };

  const fetchUsernamesFromDatabase = async () => {
    return ['user1', 'user2', 'user3'];
  };

// Function to handle adding a component to the form
const handleAddComponent = (component) => {
  // Check if the component is already added
  if (!formComponents.some((comp) => comp.type === FullNameInput)) {
    // Add FullNameInput component to formComponents array
    setFormComponents([...formComponents, <FullNameInput key={formComponents.length} />]);
  }
};


  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {/* Pass handleAddComponent as a prop to AccordionTable */}
            <AccordionTable items={accordionItems} onItemClick={handleAddComponent} />
          </div>
          <div className="col-md-9">
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
                  <label htmlFor="username">Assigned To:</label>
                  <select
                    className="form-control"
                    id="username"
                    onChange={handleUsernameSelectChange}
                  >
                    <option value="">Select Username</option>
                    {usernames.map((username, index) => (
                      <option key={index} value={username}>{username}</option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Render added form components */}
              {formComponents.map((component, index) => (
                <div key={index} className="col-md-6 mb-3">
                  {React.cloneElement(component, { onChange: handleFullNameChange })}
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
