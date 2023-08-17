// Imports required
import React from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import { QUERY_SINGLE_USER } from '../../utils/queries';
import Auth from '../../utils/auth';

// Function to render the user page
function User() {
  const userId = Auth.getUser().data._id;
    const { loading, data, error } = useQuery(QUERY_SINGLE_USER, 
      {
        variables: { userId },
      }
    );
    console.log(data);

    if (loading ) {
      return <div>Loading...</div>;
    }
    
    if (error) { 
      return <div>Error loading user data...</div>;
    }
  
    const user = data?.singleUser || {};

    if (!user) {
      return (
        <h4>
          You need to be logged in to see your user page. Use the navigation
          links above to sign up or log in!
        </h4>
      );
    }
    if (!user.codes?.length) {
      return (
        <h4>
          You have not posted any codes yet!
        </h4>
      );
    }
  
    return (
      <div>
        <h2 className="profile-title card-header">Your Codes</h2>
        <div className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
              <div className="card-body">
                {user.codes &&
                  user.codes.map((code) => (
                    <div key={code._id} className="card mb-3">
                      <h4 className="card-header bg-dark text-light p-2 m-0">
                        [{code.programmingLanguage}] {code.title}
                      </h4>
                      <div className="card-body bg-light p-2">
                        <p>{code.content}</p>
                        <p className="card-header">
                          {code.username} posted on {moment(parseInt(code.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                      </div> 
                    </div> 
                ))}
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
      
    );
}

export default User;