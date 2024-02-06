import React from "react";
import SavedProgress from "../components/SavedProgess";
import FavouriteForm from "../components/FavouriteForm";
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, and Col from Bootstrap

export default function HomePage(){
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col lg={4} style={{ marginTop: '20px', transform: 'translateY(-50%)' }}>
                        <SavedProgress />
                    </Col>    
                    <Col lg={5} style={{ marginTop: '20px' }}>
                        <FavouriteForm />
                    </Col>              
                </Row>
            </Container>
        </div>
    )
}