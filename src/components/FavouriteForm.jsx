// import React from 'react';
// import { Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// function FavouriteForm() {
//   return (
//     <Container>
//         <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
//         <h2>Favourite Forms</h2>
//         <ul>
//             <li>
//             <Link to="/incident-form">Incident Form</Link>
//             </li>
//             <li>
//             <Link to="/parts-request-form">Parts Request Form</Link>
//             </li>
//             {/* Add more form links as needed */}
//         </ul>
//         </div>
//         </Container>
//   );
// }

// export default FavouriteForm;

import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function FavouriteForm() {
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
                {/* Add more form cards as needed */}
            </div>
        </div>
    </Container>
  );
}

export default FavouriteForm;

