// Imports required
import React from "react";
import { Link } from 'react-router-dom';
import { IoLogoCodepen } from "react-icons/io5";

// Function to render the header
function Header() {
    const handleLogoClick = (event) => {
        event.preventDefault();
        window.location.assign("/");
    };

    return (
        <header>
            <div>
                <h1><Link className="title" style={{fontSize: 50}} to="/" onClick={handleLogoClick}> <IoLogoCodepen/>Crash Code</Link></h1>
            </div>
        </header>
    );
}

export default Header;