
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FavouritesContext } from '../contexts/FavouritesProvider';

export default function FavouriteForm() {

    const {setFavourites, getFavourites} = useContext(FavouritesContext)

    useEffect(() => {
        const fetchFavouritesData = async () => {
            try {
                const favouritesData = await getFavourites();
                setFavourites(favouritesData.favourites);
               // await fetchFormTemplate()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchFavouritesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Container>
        <div>
            <h2>Favourite Forms</h2>
            <div className="row">
                <div className="col-md-6">
                <div className="card bg-primary text-white mb-3">
                    <div className="card-body">
                    <h3 className="card-title">Incident Form</h3>
                    <p className="card-text">Click here to fill out the Incident Form:</p>
                    <Link to="/incident-form" className="btn btn-light">Incident Form</Link>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                <div className="card bg-primary text-white mb-3">
                    <div className="card-body">
                    <h3 className="card-title">Parts Request Form</h3>
                    <p className="card-text">Click here to fill out the Parts Request Form:</p>
                    <Link to="/parts-request-form" className="btn btn-light">Parts Request Form</Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </Container>
  );
}

