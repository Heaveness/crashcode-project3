import React from "react";
import { Link } from 'react-router-dom';


function Header() {
    return (
        <header>
        <div className="container flex-row justify-space-between-lg justify-center align-center">

        <h1><Link to="/">Crash Code</Link></h1>

        </div>
        </header>
    );
}

export default Header;