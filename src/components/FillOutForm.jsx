import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from "../contexts/FormComponentProvider"
import { useNavigate } from "react-router-dom";
import { FavouritesContext } from "../contexts/FavouritesProvider";


export default function FillOutForm({formName, formDescription}) {


    const navigate = useNavigate()

    const {apiUrl, jwt} = useContext(ApiContext)
    const {formComponents} = useContext(FormComponentContext)
    const {getFavourites, patchFavourites, favourites, setFavourites} = useContext(FavouritesContext)

    
    const [isChecked, setIsChecked] = useState(false);
    const [fillFormStructure, setFillFormStructure] = useState()
    const [formData, setFormData] = useState({});
  
    //API call functions
    const fetchFormTemplate = async () => {
        try {
            if (!formData) {
                console.error('Form data is undefined');
                return;
            }
    
            const response = await fetch(`${apiUrl}/formTemplates/${formName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch form template');
            }
            const data = await response.json();
            setFillFormStructure(data);
        } catch (error) {
            console.error('Error fetching form template:', error);
        }
    };
    

    //use Effects
    useEffect(() => {
        const fetchData = async () => {
            try {
                const favouritesData = await getFavourites();
                setFavourites(favouritesData.favourites);
                await fetchFormTemplate()
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

    const handleFavCheckboxChange = () => {
        try {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
    
            let updatedFavourites = [...favourites];
    
            if (newCheckedState && !favourites.includes(formName)) {
                updatedFavourites.push(formName);
            } else if (!newCheckedState) {
                updatedFavourites = favourites.filter(form => form !== formName);
            }
    
            setFavourites(updatedFavourites);
            patchFavourites(updatedFavourites);
        } catch (error) {
            console.error('Error handling checkbox change:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = {
            description: formDescription,
            formTemplate: fillFormStructure.template._id,
            formData: formData
        }
        console.log(formData)

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
                navigate('/forms')
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
                    {fillFormStructure && fillFormStructure.template && (
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
                                        />
                                    <label className="form-check-label" htmlFor="favCheckBox">Favourite</label>
                                </div>
                            </div>
                                <div className="form-description-container">
                                    <div className="row">
                                    <div className="col">
                                        <p>{formDescription}</p> {/* Render formDescription */}
                                        {/* <textarea 
                                        className="mb-3 form-control" 
                                        placeholder="Enter form description" 
                                        onChange={handleDescriptionChange}
                                        value={formDescription}
                                        /> */}
                                    </div>
                                    </div>
                                </div>
                                {fillFormStructure.template.components && 
                                  fillFormStructure.template.components.map((component, index) => (
                                    <div key={index} className="mb-3"> 
                                        {React.createElement(formComponents[component][0], {
                                            fill : true, 
                                            index : index, 
                                            handleInputChange : handleInputChange, 
                                            formData : formData,
                                            questionHeader: fillFormStructure.template.questionHeaders[index]
                                            })}
                                    </div>    
                            ))}
                            <div className="d-flex justify-content-center">
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary px-5">Submit</button> 
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}