// Imports required
import React from "react";
import moment from "moment";
import { Link } from 'react-router-dom'

// Function to the codes in our database
const DisplayPost = ({codes}) => {
    if (!codes.length) {
        return <h3>No Codes Yet</h3>
    }

    const sortedCodes = [...codes].sort((a, b) => b.createdAt - a.createdAt);

    // Render the to display all the codes
    return (
        <div>
            {sortedCodes && sortedCodes.map(code => (
                <div key={code._id} className="container card mb-3">
                    {/* Link to the single display of the code */}
                    <Link className="card-header btn btn-block btn-squared btn-light text-light " to={`/codes/${code._id}`}>
							<h3 className='link-title'> [{code.programmingLanguage}] {code.title} </h3>
					</Link>            
                    <div className="card-body display-body">
                        <p className="content">{code.content}</p>
                    </div>
                    <p className="card-header">
                        {code.username} posted on {moment(parseInt(code.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                </div>                
            ))}
        </div>
    )
}

export default DisplayPost;