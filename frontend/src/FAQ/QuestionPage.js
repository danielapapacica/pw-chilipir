import React, {useState, useEffect} from 'react';
import './QuestionPage.scss';
import axios from 'axios';


function QuestionPage({match}) {

  let id = match.params.id;

  const [myQuestion, setQuestion] = useState({});

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_URL}/questions/${id}`)
    .then(response => setQuestion(response.data))
    .catch(error => {});

  }, []);



  let onClickSubmit = () => {
    let answer = document.getElementById("suportAnswer");

    
    if(answer.checkValidity()){

      let obj = {
        answer: answer.value
      }

      axios.put(`${process.env.REACT_APP_URL}/questions/answer/${id}`, obj, {
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
    <div className="QuestionPage">
      <br/><br/><br/><br/><br/>

      <div className="QuestionPageBox">
        

        <div className="QuestionPageContent">
          <br/><br/><br/>

          <h2>
            {myQuestion.question}
          </h2>
          <br/>

          <form>
          <textarea class="form-control" id="suportAnswer" rows="4" required/>
          <br/>
          <button class="btn btn-primary btn-lg" onClick={onClickSubmit}>Trimite raspuns</button>
        </form>

        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
