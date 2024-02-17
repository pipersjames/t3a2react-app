import React, { useState, useEffect, useCallback, useContext } from 'react';
import Layout from '../components/layouts/Layout';
import SelectionTable from '../components/FormBuilderSelections';
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from '../contexts/FormComponentProvider';
import Select from 'react-select'

const FormBuilder = () => {
  //Context
  const { apiUrl } = useContext(ApiContext)
  // State variables
  const [formName, setFormName] = useState('');
  const [accordionItems, setAccordionItems] = useState([]);
  const [renderedFormComponents, setRenderedFormComponents] = useState([]); // State to store form components
  const [assignedTo, setAssignedTo] = useState(); // State for assignedTo input value
  const [assignedOptions, setAssignedOptions] = useState() // options for assigned dropdown filter

  const { formComponents } = useContext(FormComponentContext)
  
  const fetchUsernamesFromDatabase = async () => {
    const response = await fetch(`${apiUrl}/users/`)
    const data = await response.json()
    const userNames = data.result.map(user => ({
      value: `${user.fname} ${user.lname}`,
      label: `${user.fname} ${user.lname}`
    }))
    setAssignedOptions(userNames)
  };


  // useEffect to set up core data on page render
  useEffect(() => {
    fetchUsernamesFromDatabase()
    setAccordionItems([...Object.keys(formComponents)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle form name input change
  const handleFormNameChange = (event) => {
    setFormName(event.target.value);
  };

  const handleAssignedToChange = (selectedOption) => {
    setAssignedTo(selectedOption);
  };


  const handleAddComponent = useCallback((componentName) => {
    //console.log("Adding component:", componentName); // log the component name, troubleshooting
    // Determine the component type based on the component name
    const componentArray = formComponents[componentName]

    setRenderedFormComponents([
      ...renderedFormComponents, 
      { 
        componentName: componentName,
        type: componentArray[0], 
        key: renderedFormComponents.length, 
        edit: true
      }
    ]
  );
  //console.log(renderedFormComponents)// log rendered components
  // }
}, [formComponents, renderedFormComponents])
  
  // Function to handle deleting a component from the form
  const handleDeleteComponent = (index) => {
    setRenderedFormComponents(renderedFormComponents.filter((_, i) => i !== index));
  };
  //reset all components
  const handleReset = (event) => {
    setRenderedFormComponents([])
  }

    //test funciton

    // Function to handle form submission
    const handleCreateForm = async () => {

      if (!formName) {
        window.alert('The Form Needs a Name')
        return
      }

      if (!assignedTo) {
        window.alert('The Form needs an Assigned User')
        return
      }

      const formTemplate = {
        formName: formName,
        assignedTo: assignedTo.value,
        components: renderedFormComponents.map((comp => comp.componentName))
      };

      //console.log(formTemplate) //troubleshooting
    
      try {
        const response = await fetch(`${apiUrl}/formTemplate/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formTemplate)
        });
    
        if (response.ok) {
          // Form submitted successfully, clear the form
          setFormName('');
          setAssignedTo();
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
                  <Select
                    className="basic-single"
                    id="assignedTo"
                    value={assignedTo}
                    onChange={handleAssignedToChange}
                    options={assignedOptions}
                    placeholder="Select a User"
                    isClearable
                    isSearchable
                  />
                </div>
              </div>
              {/* Render added form components */}
              {renderedFormComponents.map((component, index) => (
                <div key={index} className="col-md-5 mb-3 border rounded m-2">
                  {/* Render the component */}
                  {React.createElement(component.type, { key: component.key, title: component.title, setTitle: component.setTitle})}

                  {/* Render delete button for each component */}
                  <button className="btn btn-sm btn-primary mt-1" onClick={() => handleDeleteComponent(index)}>Delete</button>
                </div>
              ))}
              {/* Add a submit button */}
              <div className="row mt-3">
                <div className="col-md-12 text-center">
                  <button className="btn btn-primary" onClick={handleCreateForm}>Save Template</button>
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


