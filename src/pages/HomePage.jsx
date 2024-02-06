import React from "react";
import SavedProgress from "../components/SavedProgess";
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, and Col from Bootstrap

export default function HomePage(){
    return(
        <div>
            <Container fluid>
                <Row>
                    <Col lg={3} style={{ marginTop: '30vh', transform: 'translateY(-50%)' }}>
                        <SavedProgress />
                    </Col>                  
                </Row>
            </Container>
        </div>
    )
}