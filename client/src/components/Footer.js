// Imports required
import React from "react";
import { Link } from "react-router-dom";

// Function to render the footer
function Footer() {
    return (
        <footer>
            <div className="title">
                <h2><Link to="/ContactUs">ContactUs</Link></h2>
            </div>
        </footer>    
    )
        
}

export default Footer;