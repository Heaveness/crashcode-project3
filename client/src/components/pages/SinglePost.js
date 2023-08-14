import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_CODE } from '../../utils/queries';

function SinglePost() {
    const { codeId } = useParams();

    const { loading, data, error } = useQuery(QUERY_SINGLE_CODE, {
        variables: { codeId: codeId },
    });

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
        </div>
    )
}

export default SinglePost;