import React from "react";
import { Link } from 'react-router-dom';



function Nav () {

    return (
        <div>
            <nav>
                <ul id="nav-list">
                <div>
                <label htmlFor="search" className="form-label">Search:  </label>
                <input type="text" className="form-control" aria-label="search" aria-describedby="inputGroup-sizing-sm"></input>
            </div>
                    
                    <li>
                        <Link className="btn primaryBtn" to="/createPost">Post a Code</Link>
                    </li>
                    <li>
                        <Link className="btn primaryBtn" to="/user">User</Link>
                    </li>
                    <li>
                        <Link className="btn primaryBtn" to="/login">Login / Signup</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;