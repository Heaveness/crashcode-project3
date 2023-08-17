import React from "react";
import moment from "moment";
import { QUERY_SINGLE_CODE } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const RenderComments = () => {
    const { codeId } = useParams();

    const { data } = useQuery( QUERY_SINGLE_CODE, {
        variables: { codeId: codeId },
        })
        console.log(data);
        const comments = data?.singleCode.comments || [];

    return (
        <div>
            {comments && comments.map(comment => (
                <div key={comment._id} className="card mb-3">                   
                    <div className="card-body">
                        <p>{comment.content}</p>
                    </div>
                    <p className="card-header">
                        {comment.username} posted on {moment(parseInt(comment.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
                    </p>
                </div>                
            ))}
        </div>
    )
}

export default RenderComments;