import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";
import decode from 'jwt-decode';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_CODES_BY_TITLE, SEARCH_CODES_BY_USERNAME } from "../utils/queries";

function Nav () {

const [user, setUser] = useState('');
const [searchTerm, setSearchTerm] = useState('');
    const [searchByTitle, { data: titleData, called: titleCalled }] = useLazyQuery(SEARCH_CODES_BY_TITLE);
    const [searchByUsername, { data: usernameData, called: usernameCalled }] = useLazyQuery(SEARCH_CODES_BY_USERNAME);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTitle = () => {
        searchByTitle({ variables: { title: searchTerm } });
    };

    const handleSearchUsername = () => {
        searchByUsername({ variables: { username: searchTerm } });
    };


useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
        const decodedToken = decode(token);
        setUser(decodedToken.data.username);
    }
},[]);

const handleLogout = () => {
    window.location.assign('/');
    Auth.logout();
    

}
    return (
        <div>
            <nav>
                <ul id="nav-list">
                    <div>
                        <label htmlFor="search" className="form-label">Search: </label>
                        <input 
                            type="text"
                            className="form-control"
                            aria-label="search"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSearchTitle}>Search By Title</button>
                        <button onClick={handleSearchUsername}>Search By Username</button>
                    </div>

                    {titleCalled && titleData && titleData.searchCodesByTitle && titleData.searchCodesByTitle.length ? (
                        <ul>
                            {titleData.searchCodesByTitle.map((code) => (
                                <li key={code._id}>{code.title}</li>
                            ))}
                        </ul>
                    ) : null}

                    {usernameCalled && usernameData && usernameData.searchCodesByUsername && usernameData.searchCodesByUsername.length ? (
                        <ul>
                            {usernameData.searchCodesByUsername.map((code) => (
                                <li key={code._id}>{code.username}</li>
                            ))}
                        </ul>
                    ) : null}

                    {(!titleData || !titleData.searchCodesByTitle.length) && (!usernameData || !usernameData.searchCodesByUsername.length) && (
                        <p>No codes found for the given search term!</p>
                    )}
                    
                    {user ? ( 
                    <div>
                        <h4>Welcome {user}</h4>
                    </div>  ) : (null)}
                    {user ? (
                    <li>
                    <Link className="btn primaryBtn" to="/createPost">Post a Code</Link>
                    </li>
                    ) : (null)}                   
                    {user ? (
                    <li>
                        <Link className="btn primaryBtn" to="/user">My Profile</Link>
                    </li>
                    ) : (null)}                   
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