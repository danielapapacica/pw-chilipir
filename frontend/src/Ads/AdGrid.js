import React from 'react';
import './AdGrid.scss';

let pathDir="./../images/ads-photos/";

function AdGrid(props) {

  let myObj = {...props.obj};

  return (
    <span className="AdGrid">

      <div class="card" className="Ad-content">
        <img class="card-img-top" src={pathDir + myObj._id + "/"+ myObj.photo[0]} alt="Card image cap"/>
        <div class="card-body">
          <p className="title text-dark h5">{myObj.title}</p>
          <p class="card-text h6 font-weight-light text-dark">{myObj.location}</p>
          <span class="badge badge-pill badge-primary">PRET {myObj.price} lei</span>
        </div>
      </div>

    </span>

  );
}

export default AdGrid;
