import React, {useState, useEffect} from 'react';
import './QuestionPage.scss';
import axios from 'axios';


function AnswerPage({match}) {

  let id = match.params.id;

  const [myQuestion, setQuestion] = useState({});

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_URL}/questions/${id}`)
    .then(response => setQuestion(response.data))
    .catch(error => {});

  }, []);


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

            <p>
              {myQuestion.answer}
            </p>
            <br/>


          </div>
        </div>



    </div>
  );
}

export default AnswerPage;
