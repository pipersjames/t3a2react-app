import React, { useState, useEffect, useCallback, useContext } from 'react';
import Layout from '../components/layouts/Layout';
import AccordionTable from '../components/AccordionTable';
import FullNameInput from '../components/FullNameInput'; 
import EmailInput from '../components/EmailInput';
import ShortDescription from '../components/ShortDesciption';
import LongDescription from '../components/LongDescription';
import { ApiContext } from "../contexts/ApiProvider"
import FileUpload from '../components/FileUpload/FileUpload';
import DateTimeInput from '../components/DateTimeInput';

const FormBuilder = () => {
  // State variables for form name, list of usernames, and accordion items
  const { apiUrl } = useContext(ApiContext) 
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
          'File Upload',
          'Date/Time'
        ]);
      })
      .catch((error) => console.error('Error fetching usernames:', error));
  }, []);

  // Function to handle form name input change
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  // Function to handle username input change
  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const fetchUsernamesFromDatabase = async () => {
    return ['user1', 'user2', 'user3'];
  };

  const handleAddComponent = useCallback((componentName) => {
    console.log("Adding component:", componentName); // Add this line to log the component name
    // Determine the component type based on the component name
    let componentType;
    switch (componentName) {
      case 'Full Name':
        componentType = FullNameInput;
        break;
      case 'Email':
        componentType = EmailInput;
        break;
      case 'Short answer':
        componentType = ShortDescription;
        break;
      case 'Long answer':
        componentType = LongDescription;
        break;
      case 'File Upload':
        componentType = FileUpload;
        break;
      case 'Date/Time':
        componentType = DateTimeInput;
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
}, [formComponents]);
  
  
  useEffect(() => {
    // Event listener to handle the custom event emitted by EmailInput component
    const handleEmailAdded = (event) => {
      // Add the EmailInput component to the form when a valid email is entered
      handleAddComponent('Email');
    };

    // Add the event listener
    document.addEventListener('emailAdded', handleEmailAdded);

    // Clean up the event listener
    return () => {
      document.removeEventListener('emailAdded', handleEmailAdded);
    };
  }, [handleAddComponent]); // Add formComponents to the dependency array

  // Function to handle deleting a component from the form
  const handleDeleteComponent = (index) => {
    setFormComponents(formComponents.filter((_, i) => i !== index));
  };

    // Function to handle form submission
    const handleSubmit = async () => {
      const formData = {
        formName: formName,
        assignedTo: assignedTo,
        components: formComponents.map(component => component.type.name) // Assuming component type names are unique identifiers
      };
    
      try {
        // to make changes to this link (check with CreateAccount.jsx as example)
        const response = await fetch(`${apiUrl}/formsubmissions/submitForm`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          // Form submitted successfully, clear the form
          setFormName('');
          setAssignedTo('');
          setFormComponents([]);
          console.log('Form submitted successfully');
        } else {
          // Handle error
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
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
                    {usernames.map((username, index) => (
                      <option key={index} value={username} />
                    ))}
                  </datalist>
                </div>
              </div>
              {/* Render added form components */}
              {formComponents.map((component, index) => (
                <div key={index} className="col-md-6 mb-3">
                  {/* Render the component */}
                  {React.createElement(component.type, { key: component.key, onEmailAdded: handleAddComponent })}

                  {/* {React.createElement(component.type, { key: component.key, onAddComponent: handleAddComponent })} */}
                  {/* Render delete button for each component */}
                  <button className="btn btn-sm btn-primary mt-1" onClick={() => handleDeleteComponent(index)}>Delete</button>
                </div>
              ))}
              {/* Add a submit button */}
              <div className="row mt-3">
                <div className="col-md-12 text-center">
                  <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
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


