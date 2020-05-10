import React from 'react';
import './Ad.scss';

let pathDir="./../images/ads-photos/";

function Ad(props) {

  let myObj = {...props.obj};

  let createdAtString = myObj.createdAt.split("T");
  let day = createdAtString[0];
  let hour = createdAtString[1].slice(0,5);

  return (
    <span className="Ad">


      <div className="Ad-content">

        <img  src={pathDir + myObj._id + "/"+ myObj.photo[0]}/>

        <div className="left">
          <h5 class="card-title text-dark">{myObj.title}</h5>
          <p class="card-text text-dark">{myObj.location}</p>
        </div>

        <div className="right">
          <span class="badge badge-pill badge-primary h3">PRET {myObj.price} lei</span>
          <p class="card-text text-dark"> {day} {hour}</p>
        </div>

      </div>
    </span>

  );
}

export default Ad;
