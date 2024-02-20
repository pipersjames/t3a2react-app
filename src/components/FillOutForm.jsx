import React, { useContext, useEffect, useState } from "react"
import { ApiContext } from "../contexts/ApiProvider"
import { FormComponentContext } from "../contexts/FormComponentProvider"
import Cookies from "js-cookie"


export default function FillOutForm() {

    const {apiUrl} = useContext(ApiContext)
    const {formComponents} = useContext(FormComponentContext)
    const jwt = Cookies.get('jwt')
    
    const [isChecked, setIsChecked] = useState(false);
    const [favourites, setFavourites] = useState([])
    const [fillFormStructure, setFillFormStructure] = useState()
    const [formName, setFormName] = useState()

    const fetchFormTemplate = async () => {
        try {
            const response = await fetch(`${apiUrl}/formTemplates/license`); //replace asda with prop
            const data = await response.json();
            setFillFormStructure(data);
            setFormName(data.template.formName)
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
    }, []);

    useEffect(() => {
        if (formName && favourites.includes(formName)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [formName]);

    

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