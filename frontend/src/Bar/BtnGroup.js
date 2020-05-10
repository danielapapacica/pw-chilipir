import React, {useEffect, useState} from 'react';
import './BtnGroup.scss';
import {Link} from "react-router-dom";
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function BtnGroup(props) {

  const [userInfo, setUserInfo] = useState("empty");
  let firstElement = null;
  let thirdElementLinkTo = null;

  const userIcon = <FontAwesomeIcon icon={faUser} />


  useEffect(() => {
    if (localStorage.getItem("token") != null) {

      axios.get(`${process.env.REACT_APP_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setUserInfo(response.data))
    .catch(error => {setUserInfo("empty")});
    }

  }, []);


  if(userInfo === "empty"){
    firstElement = 
    <Link to={`/account`}>
    <button type="button" class="btn btn-secondary mb1 bg-fuchsia btn-lg">Intra in cont</button>
    </Link>;
    thirdElementLinkTo = "/account";
  }else{
    firstElement = 
    <Link to={`/profile`}>
    <button type="button" class="btn btn-secondary mb1 bg-fuchsia btn-lg">{userIcon}   {userInfo.username}</button>
    </Link>;
    thirdElementLinkTo = "/new";
  }

  return (
    <div className="btn-group">

      {firstElement}

      <Link to={`/faq`}>
      <button type="button" class="btn btn-secondary mb1 bg-fuchsia btn-lg ml-2">Ajutor</button>
      </Link>

      <Link to={thirdElementLinkTo}>
      <button type="button" class="btn btn-primary btn-lg ml-2">+ Adauga anunț</button>
      </Link>
    </div>
  );
  
}

export default BtnGroup;
