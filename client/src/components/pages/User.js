import React from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_USER } from '../../utils/queries';

import Auth from '../../utils/auth';

function User() {
  const userId = Auth.getUser().data._id;
    const { loading, data, error } = useQuery(QUERY_SINGLE_USER, 
      {
        variables: { userId },
      }
    );

    if (loading ) {
      return <div>Loading...</div>;
    }
    
    if (error) { 
      return <div>Error loading user data...</div>;
    }
  
    const user = data?.singleUser.username || {};

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
        <h2 className="card-header">Your Codes</h2>
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
                          {code.username} posted on {code.createdAt}
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