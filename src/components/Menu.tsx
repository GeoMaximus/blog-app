import React from 'react';
import "../index.css";

function Details() {
    return (
        <nav className="nav">
            <ul className="nav_container">
                <li className="nav_item">
                    <a href="/" className="nav_link">Travel updates</a>
                </li>
                <li className="nav_item">
                    <a href="/" className="nav_link">Reviews</a>
                </li>
                <li className="nav_item">
                    <a href="/" className="nav_link">About</a>
                </li>
                <li className="nav_item">
                    <a href="/" className="nav_link">Contact</a>
                </li>
            </ul>
        </nav>
    );
}

export default Details;