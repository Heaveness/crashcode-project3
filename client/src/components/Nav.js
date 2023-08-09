import React from "react";



function Nav () {
    
    return (
        <div>
            <div>
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-sm">Search Below</span>
            </div>
            <input type="text" class="form-control" aria-label="search" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
            <nav>
                <ul>
                    <li>
                        <a href="#about">Login/Sign Up</a>
                    </li>
                    <li>
                        <a href="#portfolio">Post a Code!</a>
                    </li>
                    <li>
                        <a href="#portfolio">Contact Us</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;