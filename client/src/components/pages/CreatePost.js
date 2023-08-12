import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { ADD_CODE } from "../../utils/mutations";

function CreatePost() {
  const [formState, setFormState] = useState({ 
    title: '', 
    content: '', 
    programmingLanguage: '',
    username: ''
  });

  const [addCode, { error }] = useMutation(ADD_CODE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addCode({
        variables: { ...formState },
      });
      window.location.assign('/');
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
            <h4 className="card-header bg-dark text-light p-2">Post Your Code!</h4>
            <div className="card-body">
                <form onSubmit={handleFormSubmit}>
                  <label>Programming Language:</label>
                  <select className="form-input" 
                          name="programmingLanguage" 
                          id="pro-lang" 
                          value={formState.programmingLanguage}
                          onChange={handleChange}>
                    <option value="javascript">Javascript</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="c">C</option>
                    <option value="c++">C++</option>
                    <option value="c#">C#</option>
                    <option value="php">PHP</option>
                    <option value="go">Go</option>
                    <option value="other">Other</option>
                  </select>
                  <label>Title: </label>
                  <input
                    className="form-input"
                    placeholder="title"
                    name="title"
                    type="text"
                    rows = "1"
                    value = {formState.title}
                    onChange={handleChange}
                  />
                  <label>Cotent: </label>
                  <textarea
                    className="form-input"
                    placeholder="content"
                    name="content"
                    type="text"
                    rows = "5"
                    value = {formState.content}
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
  
  export default CreatePost;