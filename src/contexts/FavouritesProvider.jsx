import { createContext, useContext, useState } from "react"
import { ApiContext } from "./ApiProvider";

export const FavouritesContext = createContext()

export function FavouritesProvider(props) {

    //context
    const {apiUrl} = useContext(ApiContext)
    //use states
    const [favourites, setFavourites] = useState([])

    //API call functions
    const patchFavourites = async (favourites, jwt) => {
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
            console.log('Favourites updated:', data);
        } catch (error) {
            console.error('Error updating favourites:', error);
        }
    };
    
    const getFavourites = async (jwt) => {
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

    return (
        <FavouritesContext.Provider value={{getFavourites, patchFavourites, favourites, setFavourites}}>
            {props.children}
        </FavouritesContext.Provider>
    )
}