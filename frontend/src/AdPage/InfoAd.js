import React from 'react';
import './InfoAd.scss';



function InfoAd(props) {


  return (
    <div className="InfoAd">

      <br/>

      <div className="InfoContainer">

        <h1>{props.title}</h1>

        <div class="font-weight-bold h1 text-success"> {props.price} Lei</div>
        <br/>

        <h4>Descriere</h4>

        <p>{props.description}</p>

        <p class="font-weight-light h4">{props.location}</p>

      </div>

      <br/>

    </div>
    

  );
  
}

export default InfoAd;