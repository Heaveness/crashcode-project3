// Imports required
import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_CODES } from "../../utils/queries";

import DisplayPost from "./DisplayPost";


function Home() {
    // Execute the query on component load
  const { loading, data } = useQuery(QUERY_CODES);

  // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
  const codes = data?.codes || [];
  return (
    <div>
      {loading ? (
        <div>Loading...</div> 
      ) : (
        <DisplayPost codes={codes}/>
       )  } 
    </div>
  )
};

export default Home;
