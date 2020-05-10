import React, {useState, useEffect} from 'react';
import './FAQList.scss';
import axios from 'axios';


function AnsweredList() {

  const [markedQuestions, setQuestions] = useState([]);

  useEffect(() => {

    axios.get(`${process.env.REACT_APP_URL}/questions?type=marked`)
    .then(response => setQuestions(response.data))
    .catch(error => {});

  }, []);


  return (
    <div className="FAQList">

      <ul class="list-group">
        {markedQuestions.map(Element =>
          <li class="list-group-item">
            {Element.question}
          </li>
          )}
        <li class="list-group-item">Cras justo odio</li>
        <li class="list-group-item">Dapibus ac facilisis in</li>
        <li class="list-group-item">Morbi leo risus</li>
        <li class="list-group-item">Porta ac consectetur ac</li>
        <li class="list-group-item">Vestibulum at eros</li>
      </ul>

    </div>
  );
}

export default AnsweredList;
