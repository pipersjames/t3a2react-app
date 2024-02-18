import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from "../contexts/FormComponentProvider"


export default function FillOutForm({formName}) {

    const {apiUrl} = useContext(ApiContext)
    const {formComponents} = useContext(FormComponentContext)

    const [fillFormStructure, setFillFormStructure] = useState()

    const fetchFormTemplate = async () => {
        const response = await fetch(`${apiUrl}/formTemplates/${formName}`)
        const data = await response.json()
        setFillFormStructure(data)
    }

    useEffect(() => {
        fetchFormTemplate()
        console.log(formComponents)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6"> 
                    {fillFormStructure && fillFormStructure.template && (
                        <div className=""> 
                            <div className="d-flex justify-content-center align-items-baseline mb-4"> 
                                <h1 className="text-md-center text-lg-left display-1 mx-3">{fillFormStructure.template.formName}</h1>
                                <div className="form-check mx-3 ">
                                    <input className="form-check-input" type="checkbox" id="favCheckBox" />
                                    <label className="form-check-label" htmlFor="favCheckBox">Favourite</label>
                                </div>
                            </div>
                            {fillFormStructure.template.components && fillFormStructure.template.components.map((component, index) => (
                                <div key={index} className="mb-3"> 
                                    {React.createElement(formComponents[component][0])}
                                </div>    
                            ))}
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary px-5">Submit</button> 
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}