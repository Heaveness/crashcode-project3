import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CODE } from '../../utils/queries';
import { DELETE_CODE } from '../../utils/mutations';
import Auth from '../../utils/auth';

function SinglePost() {
    const { codeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_CODE, {
        variables: { codeId: codeId },
    });
  
    const [deleteCode] = useMutation(DELETE_CODE);


    const handleDelete = async (event) => {
        event.preventDefault();
        try {
          const { data } = await deleteCode({
            variables: { codeId: codeId },
          });
          window.location.assign('/');
        } catch (err) {
          console.error(err);
        }
      }; 
    
    
    const singleCode = data?.singleCode || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 className='card-header'>{singleCode.title}</h2>
            <h4>Code Language: {singleCode.programmingLanguage}</h4>
            <div className='card-body'>
            <p>{singleCode.content}</p>
            </div>
            <p className='card-header'>
                Posted by {singleCode.username} on {singleCode.createdAt}
            </p>
            {(singleCode.username === Auth.getUser().data.username) ? (<button className='delete-btn btn primary-btn bg-danger' onClick={handleDelete}>Delete Code?</button>) : (null)}
            
        </div>
    )
}

export default SinglePost;