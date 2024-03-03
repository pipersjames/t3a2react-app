
import SavedProgress from "../components/SavedProgess";
import FavouriteForm from "../components/FavouriteForm";
import { Container, Row, Col } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../contexts/FavouritesProvider";
import Cookies from "js-cookie";

export default function HomePage() {
    
    const jwt = Cookies.get('jwt')
    
    const { getFavourites, favourites } = useContext(FavouritesContext);
    const [loading, setLoading] = useState(true); // State to track loading status

    useEffect(() => {
        getFavourites(jwt)
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={3} className="my-3"> 
                        <SavedProgress/>
                    </Col>
                    <Col className="my-3">
                        <h2 className="text-center">Favourite Forms</h2>
                        <div className="d-flex flex-wrap"> 
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                favourites && favourites.length > 0 ? (
                                    favourites.map((fav, index) => (
                                        <div key={index} className="w-50 p-2">
                                            <FavouriteForm
                                                fill={true}
                                                index={index}
                                                fav={fav}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p>No favourite forms found.</p> 
                                )
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}