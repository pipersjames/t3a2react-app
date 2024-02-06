import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FavouriteForm() {
  return (
    <Container>
        <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
        <h2>Favourite Forms</h2>
        <ul>
            <li>
            <Link to="/incident-form">Incident Form</Link>
            </li>
            <li>
            <Link to="/parts-request-form">Parts Request Form</Link>
            </li>
            {/* Add more form links as needed */}
        </ul>
        </div>
        </Container>
  );
}

export default FavouriteForm;
