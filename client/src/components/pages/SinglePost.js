import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_CODE } from '../../utils/queries';
import { DELETE_CODE, UPDATE_CODE } from '../../utils/mutations';
import AddComment from './Comments';
import RenderComments from './CommentsList';  
import Auth from '../../utils/auth';
import moment from "moment";

function SinglePost() {
    const { codeId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_CODE, {
        variables: { codeId: codeId },
    });
  
    const [deleteCode] = useMutation(DELETE_CODE);
    const [updateCode] = useMutation(UPDATE_CODE);


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
    const handleUpdate = async (event) => {
        event.preventDefault();
        try {
            // creating update submit button
            const updateSubmitBtn = document.createElement('button');
            const updateBtn = document.getElementById('updateBtn');
            updateBtn.replaceWith(updateSubmitBtn);

            // adding attributes to update submit button and adding event listener
            updateSubmitBtn.setAttribute('class', 'btn btn-primary');
            updateSubmitBtn.setAttribute('id', 'updateSubmitBtn');
            updateSubmitBtn.innerHTML = 'Submit Changes';
            updateSubmitBtn.addEventListener  ('click', async (event) => {
                event.preventDefault();

                const changedTitle = titleInput.value;
                const changedContent = contentInput.value;
                const changedProLang = proLangInput.value;

                
                try {
                    const { data } = await updateCode({
                    variables: { codeId: codeId, title: changedTitle, content: changedContent, programmingLanguage: changedProLang},
                    });
                    window.location.assign(`/codes/${codeId}`);
                } catch (err) {
                    console.error(err);
                }

            });

            // creating cancel button
            const updateCancelBtn = document.createElement('button');
            const deleteBtn = document.getElementById('deleteBtn');
            deleteBtn.replaceWith(updateCancelBtn);

            // adding attributes to cancel button
            updateCancelBtn.setAttribute('class', 'btn btn-danger');
            updateCancelBtn.setAttribute('id', 'updateCancelBtn');
            updateCancelBtn.innerHTML = 'Cancel Changes';

            // adding event listener to cancel button
            updateCancelBtn.addEventListener('click', () => {
            updateSubmitBtn.replaceWith(updateBtn);
            updateCancelBtn.replaceWith(deleteBtn);
            titleCont.replaceChild(titleEl, titleInput);
            contentCont.replaceChild(contentEl, contentInput);
            proLangCont.replaceChild(progLangEl, proLangInput);
            });

            // creating variables for elements to be replaced
            const titleEl = document.getElementById('titleEl');
            const contentEl = document.getElementById('contentEl');
            const progLangEl = document.getElementById('progLangEl');

            const titleCont = document.getElementById('titleCont');
            const contentCont = document.getElementById('contentCont'); 
            const proLangCont = document.getElementById('proLangCont'); 

            const titleValue = titleEl.textContent;
            const contentValue = contentEl.textContent;

            // replacing elements with inputs
            const titleInput = document.createElement('textarea');
            titleInput.setAttribute('style', 'font-size: 32px; font-weight: bold;');
            titleInput.setAttribute('rows', '1');
            titleInput.setAttribute('cols', '50');
            titleInput.innerHTML = titleValue;
            titleCont.replaceChild(titleInput, titleEl);

          

            const contentInput = document.createElement('textarea');
            contentInput.setAttribute('style', 'font-size: 17.6px;');
            contentInput.setAttribute('rows', '20');
            contentInput.setAttribute('cols', '100');
            contentInput.innerHTML = contentValue;
            contentCont.replaceChild(contentInput, contentEl);

            

            // replacing element with dropdown menu
            const proLangInput = document.createElement('select');
            proLangInput.setAttribute('style', 'font-size: 24px; font-weight: bold; width: 200px; height: 60px;');
            proLangInput.setAttribute('name', 'programmingLanguage');
            proLangInput.setAttribute('id', 'pro-lang');

            const option1 = document.createElement('option');
            option1.setAttribute('value', 'Javascript');
            option1.innerHTML = 'Javascript';
            const option2 = document.createElement('option');
            option2.setAttribute('value', 'Java');
            option2.innerHTML = 'Java';
            const option3 = document.createElement('option');
            option3.setAttribute('value', 'Python');
            option3.innerHTML = 'Python';
            const option4 = document.createElement('option');
            option4.setAttribute('value', 'C');
            option4.innerHTML = 'C';
            const option5 = document.createElement('option');
            option5.setAttribute('value', 'C++');
            option5.innerHTML = 'C++';
            const option6 = document.createElement('option');
            option6.setAttribute('value', 'C#');
            option6.innerHTML = 'C#';
            const option7 = document.createElement('option');
            option7.setAttribute('value', 'PHP');
            option7.innerHTML = 'PHP';
            const option8 = document.createElement('option');
            option8.setAttribute('value', 'Go');
            option8.innerHTML = 'Go';
            const option9 = document.createElement('option');
            option9.setAttribute('value', 'Other');
            option9.innerHTML = 'Other';

            proLangInput.appendChild(option1);
            proLangInput.appendChild(option2);
            proLangInput.appendChild(option3);
            proLangInput.appendChild(option4);
            proLangInput.appendChild(option5);
            proLangInput.appendChild(option6);
            proLangInput.appendChild(option7);
            proLangInput.appendChild(option8);
            proLangInput.appendChild(option9);

            proLangCont.replaceChild(proLangInput, progLangEl);

            

        } catch (err) {
            console.error(err);
        }};
    
    
    const singleCode = data?.singleCode || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
        <div className='container'>
            <div  id ='titleCont'>
                <h2 id ='titleEl' className='card-header single-title'>{singleCode.title}</h2>
            </div>
            <h4 className="code-language" id ='progLangEl'>Code Language: {singleCode.programmingLanguage}</h4>              
            <div id = 'contentCont' className='card-body single-body'>

            <p id ='contentEl'>{singleCode.content}</p>
            </div>
            <p className='card-header single-footer'>
                Posted by {singleCode.username} on {moment(parseInt(singleCode.createdAt)).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            {(singleCode.username && Auth.getUser() && Auth.getUser().data && singleCode.username === Auth.getUser().data.username) ? (<button id='updateBtn' className='update-btn btn btn-primary' onClick={handleUpdate}>Update Code</button>) : (null)}
            {(singleCode.username && Auth.getUser() && Auth.getUser().data && singleCode.username === Auth.getUser().data.username) ? (<button id='deleteBtn' className='delete-btn btn btn-danger' onClick={handleDelete}>Delete Code</button>) : (null)}
            <AddComment />
            <RenderComments />
        </div>
        </div>
    )
}

export default SinglePost;