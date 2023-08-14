import React from "react";

const DisplayPost = ({codes}) => {
    if (!codes.length) {
        return <h3>No Codes Yet</h3>
    }
    return (
        <div>
            {codes && codes.map(code => (
                <div key={code._id} className="card mb-3">
                    <h3 className="card-header text-light bg-dark p-2 m-0">
                    [{code.programmingLanguage}] {code.title} 
                    </h3>
                    <div className="card-body">
                        <p>{code.content}</p>
                    </div>
                    <p className="card-header">
                        {code.username} posted on {code.createdAt}
                    </p>
                </div>                
            ))}
        </div>
    )
}

export default DisplayPost;