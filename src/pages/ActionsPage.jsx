import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormTemplateContext } from "../contexts/FormTemplateProvider"
import { useParams } from "react-router-dom"
import lineImage from '../assets/divider.png';
import Select from 'react-select'


export default function CompletedForm() {
    //params
    const { id } = useParams()
    //contexts
    const {apiUrl} = useContext(ApiContext)
    const {formComponents } = useContext(FormTemplateContext)
    //useStates
    const [formId] = useState(id || '')
    const [formData, setFormData] = useState(null);
    const [status, setStatus] = useState('')
    const [assignedTo, setAssignedTo] = useState()
    const [assignedOptions, setAssignedOptions] = useState() // options for assigned dropdown filter
    //Api Calls
    const fetchForm = async () => {
        try {
          const response = await fetch(`${apiUrl}/forms/${formId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch form template data');
          }
          const data = await response.json();
          setFormData(data.result);
          setStatus(data.result.status)
          console.log(data.result)
        } catch (error) {
          console.error("Error fetching form template data:", error);
        }
      };
      const fetchUsernamesFromDatabase = async () => {
        const response = await fetch(`${apiUrl}/users/`)
        const data = await response.json()
        const userNames = data.result.map(user => ({
          value: `${user._id}`,
          label: `${user.fname} ${user.lname}`
        }))
        console.log(data)
        setAssignedOptions(userNames)
      };
      //handles
      const handleAssignedToChange = (selectedOption) => {
        setAssignedTo(selectedOption);
      };

      const handleCloseForm = async () => {
        try {
          const response = await fetch (`${apiUrl}/forms/${formId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: 'closed'
            })
          })
          if (!response.ok) {
            throw new Error('failed to close the form')
          }
          const data = await response.json()
          console.log(data.result)
          setStatus(data.result)
        } catch (error) {
          console.error("Error closing the form")
        }
      }

      const handleReassign = async (event) => {
        event.preventDefault()

        if (!assignedTo) {
          window.alert('missing assigned user')
          return
        }

        try {
          const response = await fetch (`${apiUrl}/forms/${formId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: 'pending action',
              user: assignedTo,
              actions: {
                message: event.value,
                sender: formData.user
              }
            })
          })
          if (!response.ok) {
            throw new Error(`failed to re-assign the form. Status: ${response.status}`)
          }
          const data = await response.json()
          console.log(data.result)
          setStatus(data.result)
        } catch (error) {
          console.error("Error re-assigning the form")
        }
      }
      
      // useEffects
      useEffect(() => {
        fetchForm()
        fetchUsernamesFromDatabase()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
    
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6"> 
                    {formData && (
                        <div className=""> 
                            <div className="d-flex justify-content-center align-items-baseline mb-4"> 
                                <h1 className="text-md-center text-lg-left display-1 mx-3">{formData.formTemplate.formName}</h1>
                            </div>
                                <div className="form-description-container">
                                    <h2 className="text-center border-bottom p-3">{formData.formTemplate.formDescription}</h2>
                                </div>
                                {formData.formTemplate.components && 
                                  formData.formTemplate.components.map((component, index) => (
                                    <div key={index} className="mb-3"> 
                                        {React.createElement(formComponents[component], {
                                            fill : true,
                                            action : true, 
                                            index : index, 
                                            handleInputChange : '', 
                                            formData : formData,
                                            submittedFormData: formData.formData[index],
                                            questionHeader: formData.formTemplate.questionHeaders[index]
                                            })}
                                    </div>    
                            ))}
                            {formData && (
                              <div className="text-center">
                                <div>
                                  <img src={lineImage} alt="line" className="img-fluid" />
                                </div>
                                {status === 'closed' ? (
                                  <button type="submit" className="btn btn-primary px-5">
                                    Return
                                  </button>
                                ) : (
                                  <>
                                    <label>Add Comment Here</label>
                                    <textarea className="form-control mb-4"></textarea>
                                    <div className="d-flex flex-column align-items-center">
                                      <div className="col-md-6 mb-3 d-flex flex-column align-items-center">
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
                                        <div className="mt-3">
                                          <button type="submit" onClick={handleReassign} className="btn btn-primary btn-block">
                                            Re-assign
                                          </button>
                                          <button onClick={handleCloseForm} type="button" className='btn btn-secondary btn-block'>
                                            Close Form
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}