import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Stream-Lined</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/FormBuilder" activeClassName="active">Form Builder</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Forms" activeClassName="active">Forms</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Actions" activeClassName="active">Actions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Logout" activeClassName="active">Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
