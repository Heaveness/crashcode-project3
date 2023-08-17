// Imports required
import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import Auth from "../utils/auth";
import decode from 'jwt-decode';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_CODES_BY_TITLE, SEARCH_CODES_BY_USERNAME } from "../utils/queries";

// Function to render the navigation bar and functionality
function Nav ({ setSearchResults }) {

const [user, setUser] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [searchStatus, setSearchStatus] = useState(null);
const [searchByTitle] = useLazyQuery(SEARCH_CODES_BY_TITLE);
const [searchByUsername] = useLazyQuery(SEARCH_CODES_BY_USERNAME);

    const handleInputChange = async (event) => {
        setSearchTerm(event.target.value);
        setSearchStatus(null);
    };

const handleSearch = () => {
    // Search by title first.
    searchByTitle({ variables: { searchTerm } }).then(responseTitle => {
        // Search by username next.
        searchByUsername({ variables: { searchTerm } }).then(responseUsername => {
            // Combine results from both queries.
            const combinedResults = [...responseTitle.data.searchCodesByTitle, ...responseUsername.data.searchCodesByUsername];
            if (combinedResults.length === 0) {
                setSearchStatus("No results found!");  // Update status if no results
            } else {
                setSearchResults(combinedResults);
            }
        });
    });
};

// Handle enter key press
const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
};


useEffect(() => {
    const token = localStorage.getItem('id_token');
    if (token) {
        const decodedToken = decode(token);
        setUser(decodedToken.data.username);
    }
},[]);

// Handle logout
const handleLogout = () => {
    Auth.logout();
    window.location.assign('/');
    


}
// Render the navigation bar
    return (
        <div className="nav">
            <nav>
                <ul id="nav-list">
                    <div>
                    <label htmlFor="search" className="form-label search">Search: </label>
                        <input
                            type="text"
                            className="form-control"
                            aria-label="search"
                            aria-describedby="inputGroup-sizing-default"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                        />
                        <button onClick={handleSearch}>Search</button>
                        {searchStatus && <div className="error">{searchStatus}</div>}
                    </div>


                    {user ? (
                    // If user is logged in, display welcome message, post code button, profile button, and logout button
                    <div>
                        <h4 className="search">Welcome {user}</h4>
                    </div>  ) : (null)}
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