import React, {useState} from 'react';
import './AccountForm.scss';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'

import {Link} from "react-router-dom";

function AccountForm(props) {

  const [res, setRes] = useState("Not logged in");

  const userIcon = <FontAwesomeIcon icon={faUser} />
  const lockIcon = <FontAwesomeIcon icon={faLock} />



  let onClickSignIn = () => {

    let usernameOrEmail = document.getElementById("usernameOrEmail");
    let password = document.getElementById("password");

    //if valid input
    if(usernameOrEmail.checkValidity() && password.checkValidity()){

      let obj = {
        usernameOrEmail: usernameOrEmail.value,
        password: password.value
      }
  
      Axios.post(`${process.env.REACT_APP_URL}/users/login`, obj)
      .then(response => {
        setRes(`Successfully logged in `);
        localStorage.setItem("token", response.data);
      }
      ).catch(error => console.log(error));

      window.history.back();
      window.history.push("/");
    }
  };

  

  return (
    <div className="AccountForm">

      <br/>
      <br/>

      <form>
        <div class="w-75 form-group">
          {userIcon}
          <label for="usernameOrEmail" class="h5 ml-2"> Username-ul tau sau emailul</label>
          <input type="text" pattern='(^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$)|(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)' 
          class="form-control" id="usernameOrEmail" placeholder="Username/email"/>
        </div>


        <br/>
        <div class="w-75 form-group">
          {lockIcon}
          <label for="password" class="h5 ml-2">Introdu parola</label>
          <input type="password" class="form-control" id="password" placeholder="Parola"/>
        </div>

        <br/>
        <button type="submit" class="btn btn-primary btn-lg" onClick={onClickSignIn}>Intra in cont</button>
      </form>

      
    </div>
  );
}

export default AccountForm;
