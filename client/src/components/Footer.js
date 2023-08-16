import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="container flex-row justify-space-between-lg justify-center align-center">
                <h1>Crash Code Footer</h1>
                <h2><Link to="/ContactUs">ContactUs</Link></h2>
            </div>
        </footer>    
    )
        
}

export default Footer;