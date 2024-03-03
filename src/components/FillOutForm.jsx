import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormTemplateContext } from "../contexts/FormTemplateProvider"
import { FavouritesContext } from "../contexts/FavouritesProvider";
import Cookies from "js-cookie";


export default function FillOutForm({formName, formDescription, setCreatingForm, setFormDescription, renderedFormComponents, preview, fetchUserForms}) {

    const jwt = Cookies.get('jwt')

    const {apiUrl} = useContext(ApiContext)
    const {formComponents, formTemplate, fetchFormTemplate } = useContext(FormTemplateContext)
    const {getFavourites, patchFavourites, favourites, setFavourites} = useContext(FavouritesContext)

    
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({});
  
    //API call functions

    //use Effects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const favouritesData = await getFavourites(jwt);
                setFavourites(favouritesData.favourites);
                await fetchFormTemplate(formName, renderedFormComponents)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (formName && favourites.includes(formName)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formName]);


    //handles

    const handleInputChange = (index, value) => {
        setFormData(prevData => ({
          ...prevData,
          [index]: value
        }));
      };

    const handleFavCheckboxChange = (formName) => {
        try {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);

            let updatedFavourites = [...favourites];
            
            if (!favourites) {
                updatedFavourites.push(formName);
            }
            if (newCheckedState && !favourites.includes(formName)) {
                updatedFavourites.push(formName);
            } else if (!newCheckedState) {
                updatedFavourites = favourites.filter(form => form !== formName);
            }
    
            setFavourites(updatedFavourites);
            patchFavourites(updatedFavourites, jwt);
        } catch (error) {
            console.error('Error handling checkbox change:', error);
        }
    };
    //Api Handle
    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = {
            description: formDescription,
            formTemplate: formTemplate._id,
            formData: formData,
            assignedTo: formTemplate.assignedTo
        }
        try {
            const response = await fetch(`${apiUrl}/forms/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    jwt : jwt
                },
                body: JSON.stringify(form)
            })

            if (response.ok) {
                setCreatingForm(false)
                setFormDescription('')
                fetchUserForms(formTemplate._id)
            } else {
                console.error('Form submission failed')
            }
        } catch (error) {
            console.error('Error submitting form', error)
        }
    
    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6"> 
                    {formTemplate && (
                        <div className=""> 
                            <div className="d-flex justify-content-center align-items-baseline mb-4"> 
                                <h1 className="text-md-center text-lg-left display-1 mx-3">{formName}</h1>
                                <div className="form-check mx-3 ">
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        id="favCheckBox"
                                        checked={isChecked}
                                        onChange={handleFavCheckboxChange} 
                                        disabled={preview}
                                        />
                                    <label className="form-check-label" htmlFor="favCheckBox">Favourite</label>
                                </div>
                            </div>
                                <div className="form-description-container">
                                    <h2 className="text-center border-bottom p-3">{formDescription}</h2>
                                </div>
                                {formTemplate.components && 
                                  formTemplate.components.map((component, index) => (
                                    <div key={index} className="mb-3"> 
                                        {React.createElement(formComponents[component], {
                                            fill : true, 
                                            index : index, 
                                            handleInputChange : handleInputChange, 
                                            formData : formData,
                                            questionHeader: formTemplate.questionHeaders[index]
                                            })}
                                    </div>    
                            ))}
                            <div className="d-flex justify-content-center">
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary px-5" disabled={preview}>Submit</button> 
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}