import React, { useContext, useEffect, useState } from "react";
import SavedProgress from "../components/SavedProgess";
import FavouriteForm from "../components/FavouriteForm";
import { Container, Row, Col } from 'react-bootstrap';
import { ApiContext } from "../contexts/ApiProvider";

export default function HomePage() {
    // //contexts
    // const {apiUrl} = useContext(ApiContext)
    // //statevariables
    // //const [favourites, setFavourites] = useState([])
    // //async functions

    // const jwt = Cookies.get('jwt')

    // const fetchFavourites = async () => {
    //     const response = await fetch(`${apiUrl}/users/`, {
    //         method: 'GET',
    //         headers: {
                
    //         }
    //     })
    //     const data = await response.json()
    //     console.log(data)
    // }

    // useEffect(() => {
    //     fetchFavourites()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="my-3">
                        <SavedProgress />
                    </Col>
                    <Col xs={12} md={6} className="my-3">
                        <FavouriteForm />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}