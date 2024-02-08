import React, { useState, useEffect } from 'react';
import Layout from '../components/layouts/Layout'; 
import AccordionTable from '../components/AccordionTable';

const FormBuilder = () => {
  // State variables for form name, list of usernames, and accordion items
  const [formName, setFormName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [accordionItems, setAccordionItems] = useState([]);

  // useEffect hook to fetch usernames from the database
  useEffect(() => {
    // Example fetch request to retrieve usernames from the database
    // To replace with actual fetch request
    fetchUsernamesFromDatabase()
      .then((data) => {
        setUsernames(data);
        // Update accordionItems based on fetched usernames
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

  // Function to handle username select change
  const handleUsernameSelectChange = (event) => {
    // Handle selected username
    console.log('Selected username:', event.target.value);
  };

  // Function to fetch usernames from the database (To replace with actual fetch function)
  const fetchUsernamesFromDatabase = async () => {
    // Example function to fetch usernames (replace with actual implementation)
    return ['user1', 'user2', 'user3'];
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3"> {/* Left column for AccordionTable */}
            <AccordionTable items={accordionItems} />
          </div>
          <div className="col-md-9"> {/* Right column for form name input and assigned user select */}
            <div className="row"> {/* Row for form name input and assigned user select */}
              <div className="col-md-6 mb-3"> {/* Column for form name input */}
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
              <div className="col-md-6 mb-3"> {/* Column for assigned user select */}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormBuilder;
