import React, { useState }  from 'react';
import { useMutation } from '@apollo/client';
import { ADD_COMMENTS } from '../../utils/mutations';
import {  useParams } from 'react-router-dom';
import Auth from '../../utils/auth';


function AddComment() {
    const { codeId } = useParams();
    
    const [formState, setFormState] = useState({ 
      text: '', 
      username: Auth.getUser().data.username,
    });
  
    const [addComments, { error }] = useMutation(ADD_COMMENTS);
  
    const handleCommentSubmit = async (event) => {
      event.preventDefault();
      try {
        const { data } = await addComments({
          variables: { ...formState },
        });
        console.log(data);
        window.location.assign(`/codes/${codeId}`);
      } catch (err) {
        console.error(err);
      }
    }; 
    
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({ ...formState, [name]: value });
    }  
      
      return (
        <main className="flex-row justify-center mb-4">
          <div className="col-12 col-lg-10">
            <div className="card">
              <div className="card-body">
                  <form onSubmit={handleCommentSubmit}>
                    <label>Comment: </label>
                    <textarea
                      className="form-input"
                      placeholder="comment"
                      name="text"
                      type="text"
                      rows = "2"
                      value = {formState.text}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-block btn-info"
                      type="submit"
                    >
                      Submit
                    </button>
                    {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                      Something went wrong...
                    </div>
                  )}
                  </form>
              </div>
            </div>
          </div>
        </main>
      );
    };
    
    export default AddComment;