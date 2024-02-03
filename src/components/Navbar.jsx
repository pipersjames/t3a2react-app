import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <div className = "navbar-menu">
                <ul>
                    <li>
                        <NavLink to='/Home' activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/Form Builder' activeClassName="active">Form Builder</NavLink>
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
        </nav>
    )
}
