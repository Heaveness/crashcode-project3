// Imports required
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENTS, ADD_COMMENT_TO_CODE} from '../../utils/mutations';
import { useParams } from 'react-router-dom';
import Auth from '../../utils/auth';

// Function to add comments to a code
function AddComment() {
  const { codeId } = useParams();

  const [formState, setFormState] = useState({
    text: '',
    username: Auth.loggedIn() ? Auth.getUser().data.username : '',
  });

  // Mutation to add comments
  const [addComments, { error }] = useMutation(ADD_COMMENTS);
  const [addCommentToCode] = useMutation(ADD_COMMENT_TO_CODE);

  // Function to handle comment submit
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addComments({
        variables: { ...formState },
      });
      console.log(codeId);
      console.log(data.addComments.text);

      const { data: data2 } = await addCommentToCode({
        variables: { _id: codeId, _ObjectId: data.addComments._id},
      });
      console.log(data2);

      window.location.assign(`/codes/${codeId}`);
    } catch (err) {
      console.error(err);
    }
  };
 
  // Function to handle change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  // Render the form
  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-body">
            {Auth.loggedIn() ? (
              <form onSubmit={handleCommentSubmit}>
                <label>Comment: </label>
                <textarea
                  className="form-input"
                  placeholder="comment"
                  name="text"
                  type="text"
                  rows="2"
                  value={formState.text}
                  onChange={handleChange}
                />
                <button className="btn btn-block btn-info" type="submit">
                  Submit
                </button>
                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    Something went wrong...
                  </div>
                )}
              </form>
            ) : (
              <h3>You must log in to use the comment function</h3>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AddComment;
