import React, { useState, useEffect, useCallback, useContext } from 'react';
import Layout from '../components/Layout';
import SelectionTable from '../components/FormBuilderSelections';
import { ApiContext } from "../contexts/ApiProvider"
import { FormTemplateContext } from '../contexts/FormTemplateProvider';
import Select from 'react-select'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Modal } from 'react-bootstrap';
import FillOutForm from '../components/FillOutForm';

const FormBuilder = () => {

  const navigate = useNavigate()
  const auth = Cookies.get('auth')
  //Context
  const { apiUrl } = useContext(ApiContext)
  const { formComponents } = useContext(FormTemplateContext)
  // State variables
  const [formName, setFormName] = useState('');
  const [accordionItems, setAccordionItems] = useState([]);
  const [renderedFormComponents, setRenderedFormComponents] = useState([]); // State to store form components
  const [assignedTo, setAssignedTo] = useState(); // State for assignedTo input value
  const [assignedOptions, setAssignedOptions] = useState() // options for assigned dropdown filter
  const [questionHeaders, setQuestionHeaders] = useState([])
  const [showOverlay, setShowOverlay] = useState(false);
  const [ previewTemplate, setPreviewTemplate] = useState({})
  
  const fetchUsernamesFromDatabase = async () => {
    const response = await fetch(`${apiUrl}/users/`)
    const data = await response.json()
    const userNames = data.result.map(user => ({
      value: `${user._id}`,
      label: `${user.fname} ${user.lname}`
    }))
    setAssignedOptions(userNames)
  };

  // useEffect to set up core data on page render
  useEffect(() => {
    if (auth !== 'admin' && auth !== 'manager'){
      navigate('/')
    }
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

  const handleToggleOverlayPreview = () => {

    setPreviewTemplate({
      formName: formName,
      assignedTo: assignedTo ? assignedTo.value : '',
      components: renderedFormComponents.map((comp => comp.componentName)),
      questionHeaders: questionHeaders
    })
    setShowOverlay(!showOverlay);
    
  };



  const handleAddComponent = useCallback((componentName) => {
    //console.log("Adding component:", componentName); // log the component name, troubleshooting
    // Determine the component type based on the component name
    const componentArray = formComponents[componentName]
     

    setRenderedFormComponents([
      ...renderedFormComponents, 
      { 
        componentName: componentName,
        type: componentArray, 
        key: renderedFormComponents.length,
        index: renderedFormComponents.length, 
        edit: true,
        setQuestionHeaders: setQuestionHeaders
      }
    ]
  );
  //console.log(renderedFormComponents)// log rendered components
}, [formComponents, renderedFormComponents, setQuestionHeaders])

  
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
        components: renderedFormComponents.map((comp => comp.componentName)),
        questionHeaders: questionHeaders
      };

      //console.log(formTemplate) //troubleshooting
    
      try {
        // to make changes to this link (check with CreateAccount.jsx as example)
        const response = await fetch(`${apiUrl}/formTemplates/add`, {
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
          setQuestionHeaders([])
          console.log('Form template created successfully');
        } else {
          // Handle error
          console.error('Form template creation failed');
        }
      } catch (error) {
        console.error('Error creating form:', error);
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
                  {React.createElement(
                    component.type, 
                    {  
                      key: component.key, 
                      edit: component.edit, 
                      setQuestionHeaders: component.setQuestionHeaders, 
                      index: component.index
                    })}

                  {/* Render delete button for each component */}
                  <button className="btn btn-sm btn-primary mt-1" onClick={() => handleDeleteComponent(index)}>Remove</button>
                </div>
              ))}
              {/* Add a submit button */}
              <div className="row mt-3">
                <div className="col-md-12 text-center">
                <button className='btn btn-secondary mx-2' onClick={handleToggleOverlayPreview}>Preview Form</button>
                  <button className="btn btn-primary" onClick={handleCreateForm}>Save Template</button>
                  
                  <div>
                    <Modal show={showOverlay} onHide={handleToggleOverlayPreview} backdrop="static">
                      <Modal.Header closeButton>
                        <Modal.Title>Overlay Title</Modal.Title>
                          </Modal.Header>
                            <Modal.Body>
                              <FillOutForm 
                                formName={formName} 
                                renderedFormComponents={previewTemplate}
                                preview={true}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                              <button onClick={handleToggleOverlayPreview}>Close</button>
                            </Modal.Footer>
                          </Modal>
                    </div>
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


