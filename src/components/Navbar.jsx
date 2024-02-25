import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Cookies from 'js-cookie';

export default function Navbar() {

    const auth = Cookies.get('auth')

    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            Cookies.remove('jwt');
            Cookies.remove('auth')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Stream-Lined</NavLink>
                <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home" activeclassname="active">Home</NavLink>
                        </li>
                        {(auth === 'admin' || auth === 'manager') && (<li className="nav-item">
                            <NavLink className="nav-link" to="/FormBuilder" activeclassname="active">Form Builder</NavLink>
                        </li>)}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Forms" activeclassname="active">Forms</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/Actions" activeclassname="active">Actions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" activeclassname="active" onClick={handleLogout}>Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
