import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";
import decode from 'jwt-decode';



function Nav () {

const [user, setUser] = useState('');
useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
        const decodedToken = decode(token);
        setUser(decodedToken.data.username);
    }
},[]);

const handleLogout = () => {
    Auth.logout();

}
    return (
        <div>
            <nav>
                <ul id="nav-list">
                    <div>
                        <label htmlFor="search" className="form-label">Search: </label>
                        <input type="text" className="form-control" aria-label="search" aria-describedby="inputGroup-sizing-sm"></input>
                    </div>
                    {user ? ( 
                    <div>
                        <h4>Welcome {user}</h4>
                    </div>  ) : (null)}
                                      
                    <li>
                        <Link className="btn primaryBtn" to="/createPost">Post a Code</Link>
                    </li>
                    <li>
                        <Link className="btn primaryBtn" to="/user">User</Link>
                    </li>
                    {user ? (
                    <li>
                        <button className="btn primaryBtn" onClick={handleLogout}>Logout</button>
                    </li> ):(
                    <li>
                        <Link className="btn primaryBtn" to="/login">Login / Signup</Link>
                    </li>
                    )}
                    
                </ul>
            </nav>
        </div>
    );
}

export default Nav;