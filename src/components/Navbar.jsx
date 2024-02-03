import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Navbar(){
    return (
        <nav>
            <h3>Navbar</h3>
            <ul>
                <li>
                    <NavLink to='/Home' style={({isActive}) => isActive ? {color: "red"} : undefined}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/Form Builder' style={({isActive}) => isActive ? {color: "red"} : undefined}>Form Builder</NavLink>
                </li>
                <li>
                    <NavLink to='/Forms ' style={({isActive}) => isActive ? {color: "red"} : undefined}>Forms</NavLink>
                </li>
                <li>
                    <NavLink to='/Actions' style={({isActive}) => isActive ? {color: "red"} : undefined}>Actions</NavLink>
                </li>
                <li>
                    <NavLink to='/Logout' style={({isActive}) => isActive ? {color: "red"} : undefined}>Logout</NavLink>
                </li>
            </ul>
        </nav>
    )
}