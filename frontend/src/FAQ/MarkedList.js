import React, {useState, useEffect} from 'react';
import './FAQList.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmprty} from '@fortawesome/free-regular-svg-icons';


const solidStarIcon = <FontAwesomeIcon icon={faStarSolid} size="lg"/>
const emptyStarIcon = <FontAwesomeIcon icon={faStarEmprty} size="lg"/>


function MarkedList(props) {

  const [markedQuestions, setQuestions] = useState([]);

  let starIcon;

  if(props.type === "marked")
    starIcon = solidStarIcon;
  else
    starIcon = emptyStarIcon;


  useEffect(() => {

    axios.get(`${process.env.REACT_APP_URL}/questions?type=${props.type}`)
    .then(response => setQuestions(response.data))
    .catch(error => {});

  }, []);


  let onClickChangeMark = (id, marking) => {

    let obj = {marking: !marking};

    axios.put(`${process.env.REACT_APP_URL}/questions/mark/${id}`, obj, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => {
      window.location.reload();
    }
    ).catch(error => console.log(error));

  };



  return (
    <div className="FAQList">

      <ul class="list-group">
        {markedQuestions.map(Element =>
          <li class="list-group-item">
            <div className="QuestionLeft">
              {Element.question}
            </div>

            <div className="QuestionRight">
              <Link to={`/answer/${Element._id}`}>
                <button class="btn btn-primary">Vezi</button>
              </Link>

              <button class="btn btn-warning ml-3" onClick={() => onClickChangeMark(Element._id, Element.isMarked)}>{starIcon}</button>

            </div>

          </li>
          )}
      </ul>

    </div>
  );
}

export default MarkedList;
