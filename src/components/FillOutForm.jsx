import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from "../contexts/FormComponentProvider"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";


export default function FillOutForm(props) {


    const navigate = useNavigate()
    const {apiUrl} = useContext(ApiContext)
    const {formComponents} = useContext(FormComponentContext)
    const jwt = Cookies.get('jwt')
    
    const [isChecked, setIsChecked] = useState(false);
    const [favourites, setFavourites] = useState([])
    const [fillFormStructure, setFillFormStructure] = useState()
    const [formName, setFormName] = useState()
    const [formData, setFormData] = useState({});
  
    const handleInputChange = (index, value) => {
      setFormData(prevData => ({
        ...prevData,
        [index]: value
      }));
    };

    //testing components to be replace entirely once props are passed
    // Passed on as formDescription
    // const describe = 'test'


    // const describe = description || 'test'

    const fetchFormTemplate = async () => {
        try {
            if (!formData) {
                console.error('Form data is undefined');
                return;
            }
    
            const response = await fetch(`${apiUrl}/forms/${props.formName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch form template');
            }
            const data = await response.json();
            setFillFormStructure(data);
            setFormName(data.template.formName);
        } catch (error) {
            console.error('Error fetching form template:', error);
        }
    };
    

    const patchFavourites = async (favourites) => {
        try {
            const response = await fetch(`${apiUrl}/users/favourites`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt': jwt
                },
                body: JSON.stringify({
                    favourite: favourites,
                })
            });
            const data = await response.json();
            console.log('Favourites updated:', data.favourites);
        } catch (error) {
            console.error('Error updating favourites:', error);
        }
    };
    //favourites toggle functionality
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

    const getFavourites = async () => {
        const response = await fetch(`${apiUrl}/users/favourites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'jwt': jwt
            }
        })
        const data = await response.json()
        
        return data
    }

    //page init
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

    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = {
            description: props.formDescription,
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
                                        <p>{props.formDescription}</p> {/* Render formDescription */}
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