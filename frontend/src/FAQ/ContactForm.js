import React, {useState} from 'react';
import './ContactForm.scss';
import Axios from 'axios';


function ContactForm() {



  let onClickSubmit = () => {
    let question = document.getElementById("question");

    if(question.checkValidity()){

      let obj = {
        question: question.value
      }

      Axios.post(`${process.env.REACT_APP_URL}/questions`, obj, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(response => {
      }
      ).catch(error => console.log(error));
    }
  };

  return (

    <div className='ContactForm'>

      <form>
        <textarea class="form-control" id="question" rows="4" required/>
        <br/>
        <button class="btn btn-primary btn-lg" onClick={onClickSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
