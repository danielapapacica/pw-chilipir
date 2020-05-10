import React, {useEffect, useState} from 'react';
import './AdsList.scss';
import AdGrid from './AdGrid.js';
import Ad from './Ad.js';
import {Link} from "react-router-dom";
import axios from "axios";


let typeList = 1;
let typeGrid = 2;


function AdsList(props) {


  return (
    <div className="AdsList">

        {props.list.map(element =>
          {
            if(props.type === typeList)
              return <Link to={`/ad/${element._id}`}><Ad obj={element}/></Link>;
            else
              return <Link to={`/ad/${element._id}`}><AdGrid obj={element}/></Link>;
          }
        )}

    </div>
  );
}

export default AdsList;
