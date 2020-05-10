import React from 'react';
import './Bar.scss';
import mainLogo from './../images/main-logo.jpg';
import chiliLogo from './../images/chili-logo.png';
import BtnGroup from './BtnGroup';

import {Link} from "react-router-dom";


function Bar(props) {


  return (
    <div className="bar">


        <nav class="navbar fixed-top scrolling-navbar navbar-expand-lg">
            <div class="container">

            <Link to={`/`}>
              <img class="main-logo" src={mainLogo}></img>
            </Link>
            <BtnGroup></BtnGroup>

            </div>
        </nav>
    </div>
    

  );
  
}

export default Bar;
