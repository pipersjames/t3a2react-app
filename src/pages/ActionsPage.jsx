import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormTemplateContext } from "../contexts/FormTemplateProvider"
import { useParams } from "react-router-dom"
import lineImage from '../assets/divider.png';


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
      const closeForm = async () => {
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
      // useEffects
      useEffect(() => {
        fetchForm()
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
                                    <label htmlFor="">Add Comment Here</label>
                                    <textarea className="form-control mb-4"></textarea>
                                    <div>
                                      <button type="submit" className="btn btn-primary px-5">
                                        Re-assign
                                      </button>
                                      <button onClick={closeForm} type="button" className='btn btn-secondary px-5'>
                                        Close Form
                                      </button>
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