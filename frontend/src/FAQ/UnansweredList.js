import React, {useState, useEffect} from 'react';
import './FAQList.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';


function UnansweredList() {

  const [unansweredQuestions, setQuestions] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_URL}/questions?type=unanswered`)
    .then(response => setQuestions(response.data))
    .catch(error => {});

  }, []);





  return (
    <div className="FAQList">

      <ul class="list-group">
        {unansweredQuestions.map(Element =>
          <li class="list-group-item">
            <div className="QuestionLeft">
              {Element.question}
            </div>

            <div className="QuestionRight">
              <Link to={`/question/${Element._id}`}>
                <button class="btn btn-primary">Raspunde</button>
              </Link>

            </div>

          </li>
          )}
      </ul>

    </div>
  );
}

export default UnansweredList;
