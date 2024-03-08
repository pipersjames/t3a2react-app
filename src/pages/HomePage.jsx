
import SavedProgress from "../components/SavedProgess";
import FavouriteForms from "../components/FavouriteForms";
import { Container, Row, Col } from 'react-bootstrap';
import React, { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../contexts/FavouritesProvider";
import Cookies from "js-cookie";

export default function HomePage() {
    //cookies
    const jwt = Cookies.get('jwt')
    //contexts
    const { getFavourites, favourites } = useContext(FavouritesContext);
    //useStates
    const [loading, setLoading] = useState(true); // State to track loading status
    const [savedInProgress] = useState([])
    //useEffects
    useEffect(() => {
        getFavourites(jwt)
        setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} lg={3} className="border rounded mt-5">
                    <h3>Step by Step</h3>
                    <p>1. Navigate to the forms page</p>
                    <p>2. Select the form you would like to submit</p>
                    <p>3. Complete and submit your form</p>
                    <p>4. Comment on forms assigned to you on the Actions Page</p>
                    </Col>
                    
                {savedInProgress.length > 0 && <Col xs={12} md={3} className="my-3"> 
                          <SavedProgress/>
                    </Col>}
                    <Col xs={12} md={9} className="my-3">
                        <h2 className="text-center">Favourite Forms</h2>
                        <div className="d-flex flex-wrap justify-content-center"> 
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                favourites && favourites.length > 0 ? (
                                    favourites.map((fav, index) => (
                                        <Col key={index} xs={12} lg={6} className="p-2">
                                            <FavouriteForms
                                                fill={true}
                                                index={index}
                                                fav={fav}
                                            />
                                        </Col>
                                    ))
                                ) : (
                                    <p className="text-center">No favourite forms found.</p> 
                                )
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}