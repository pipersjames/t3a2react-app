import React from "react";
import SavedProgress from "../components/SavedProgess";
import FavouriteForm from "../components/FavouriteForm";
import { Container } from 'react-bootstrap'; // Import Container, Row, and Col from Bootstrap

export default function HomePage(){
    return(
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Container>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ flex: '1', minWidth: '300px', margin: '10px' }}>
                        <SavedProgress />
                    </div>
                    <div style={{ flex: '1', minWidth: '300px', margin: '10px' }}>
                        <FavouriteForm />
                    </div>
                </div>
            </Container>
        </div>
    )
}