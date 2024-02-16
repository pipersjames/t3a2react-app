import React, { useState, useEffect, useCallback, useContext } from 'react';
import Layout from '../components/layouts/Layout';
import SelectionTable from '../components/FormBuilderSelections';
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from '../contexts/FormComponentProvider';

const FormBuilder = () => {
  // State variables for form name, list of usernames, and accordion items
  const { apiUrl } = useContext(ApiContext) 
  const [formName, setFormName] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [accordionItems, setAccordionItems] = useState([]);
  const [renderedFormComponents, setRenderedFormComponents] = useState([]); // State to store form components
  const [assignedTo, setAssignedTo] = useState(''); // State for assignedTo input value

  const { formComponents } = useContext(FormComponentContext)
  

  // useEffect hook to fetch usernames from the database
  useEffect(() => {
    fetchUsernamesFromDatabase()
      .then((data) => {
        setUsernames(data);
        setAccordionItems([...Object.keys(formComponents)]);
      })
      .catch((error) => console.error('Error fetching usernames:', error));
  }, [formComponents]);

  // Function to handle form name input change
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  // Function to handle username input change
  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const fetchUsernamesFromDatabase = async () => {
    return ['user1', 'user2', 'user3']; //example needs fetch request, render in assigned to:
  };

  const handleAddComponent = useCallback((componentName) => {
    console.log("Adding component:", componentName); // log the component name, troubleshooting
    // Determine the component type based on the component name
    const componentArray = formComponents[componentName]
    const componentType = componentArray[0]

  // Check if the component is already added
  // if (!renderedFormComponents.some((comp) => comp.type === componentType)) {
    // Add component to renderedFormComponents array
    setRenderedFormComponents([...renderedFormComponents, { type: componentType, key: renderedFormComponents.length }]);
  // }
}, [formComponents, renderedFormComponents])

console.log(renderedFormComponents)
  
  // Function to handle deleting a component from the form
  const handleDeleteComponent = (index) => {
    setRenderedFormComponents(renderedFormComponents.filter((_, i) => i !== index));
  };

    // Function to handle form submission
    const handleCreateForm = async () => {
      const formData = {
        formName: formName,
        assignedTo: assignedTo,
        components: renderedFormComponents.map(component => component.type.name) // Assuming component type names are unique identifiers
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
          setRenderedFormComponents([]);
          console.log('Form submitted successfully');
        } else {
          // Handle error
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    const handleReset = (event) => {
      setRenderedFormComponents([])
    }

    
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {/* Pass handleAddComponent as a prop to AccordionTable */}
            <SelectionTable items={accordionItems} onItemClick={handleAddComponent} />
          </div>
          <div className="col-md-9">
            <div className="row justify-content-around">
              <div className='mb-4'>
                <button className='btn btn-secondary float-left' onClick={handleReset}>Reset</button>
              </div>
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
              {renderedFormComponents.map((component, index) => (
                <div key={index} className="col-md-5 mb-3 border rounded m-2">
                  {/* Render the component */}
                  {React.createElement(component.type, { key: component.key, onEmailAdded: handleAddComponent, onFullNameAdded: handleAddComponent, onAddComponent: handleAddComponent })}

                  {/* Render delete button for each component */}
                  <button className="btn btn-sm btn-primary mt-1" onClick={() => handleDeleteComponent(index)}>Delete</button>
                </div>
              ))}
              {/* Add a submit button */}
              <div className="row mt-3">
                <div className="col-md-12 text-center">
                  <button className="btn btn-primary" onClick={handleCreateForm}>Submit</button>
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


