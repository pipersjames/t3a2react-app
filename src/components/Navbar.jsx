import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-menu">
                <button className="hamburger-icon" onClick={() => setIsOpen(!isOpen)}>☰</button>
                <div className={`navbar-items ${isOpen ? 'open' : ''}`}>
                    <ul>
                        <li>
                            <NavLink to='/' activeClassName="active">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/FormBuilder' activeClassName="active">Form Builder</NavLink>
                        </li>
                        <li>
                            <NavLink to='/Forms' activeClassName="active">Forms</NavLink>
                        </li>
                        <li>
                            <NavLink to='/Actions' activeClassName="active">Actions</NavLink>
                        </li>
                        <li>
                            <NavLink to='/Logout' activeClassName="active">Logout</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

