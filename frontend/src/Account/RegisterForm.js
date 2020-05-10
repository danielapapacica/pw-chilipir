import React from 'react';
import './RegisterForm.scss';
import Axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'

function RegisterForm(props) {

  const userIcon = <FontAwesomeIcon icon={faUser} />
  const lockIcon = <FontAwesomeIcon icon={faLock} />
  const envelopeIcon = <FontAwesomeIcon icon={faEnvelope} />
  const phoneIcon = <FontAwesomeIcon icon={faPhone} />
  const mapIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />


  let onClickRegister = () => {

    let name = document.getElementById("regName");
    let email = document.getElementById("regEmail");
    let phone = document.getElementById("regPhone");
    let location = document.getElementById("regLocation");
    let user = document.getElementById("regUser");
    let password = document.getElementById("regPassword");
    let checkbox = document.getElementById("regCheck");

    //if valid input
    if(name.checkValidity() && email.checkValidity()  && phone.checkValidity() && location.checkValidity()
     && user.checkValidity() && password.checkValidity() && checkbox.checkValidity()){
      let obj = {
        name: name.value,
        username: user.value,
        password: password.value,
        email: email.value,
        phone: phone.value,
        location: location.value
      }
  
      Axios.post(`${process.env.REACT_APP_URL}/users/register`, obj)
      .then(response => {
      }
      ).catch(error => console.log(error));

    }
  };



  const districts = [
    "Arad", "Timisoara", "Deva", "Harghita", "Covasna", "Arges", "Bucureti", "Ilfov", "Giurgiu", "Dolj", "Bihor", "Ialomita"
  ];

  return (
    <div className="RegisterForm">

      <br/>
      <br/>

      <form data-toggle="validator" role="form">

        <div class="w-75 form-group">
          <label for="regName" class="control-label h5 ml-2"> Nume</label>
          <input type="text" pattern="^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$" class="form-control" id="regName" placeholder="Nume" required/>
        </div>
        <br/>

        <div class="w-75 form-group">
          {envelopeIcon}
          <label for="regEmail" class="h5 ml-2"> Adresa de email</label>
          <input type="email" class="form-control" id="regEmail" aria-describedby="emailHelp" placeholder="user@example.com" required/>
        </div>
        <br/>

        <div class="w-75 form-group">
          {phoneIcon}
          <label for="regPhone" class="h5 ml-2"> Telefon</label>
          <input type="text" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" setCustomValidity="Campul trebuie sa continua doar numere" class="form-control" id="regPhone" placeholder="0722222222" required/>
        </div>
        <br/>

        <div class="w-75 form-group">
          {mapIcon}
          <label for="regLocation" class="h5 ml-2 w-50">Alege judetul</label>
          <select id="regLocation" class="form-control">
            <option selected>Judet</option>
            {districts.map( element => <option>{element}</option>)}
          </select>
        </div>

        <br/>
        <div class="w-75 form-group">
          {userIcon}
          <label for="regUser" class="h5 ml-2"> Alege un username</label>
          <input type="text" pattern="^(?=[a-zA-Z0-9._]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$" class="form-control" id="regUser" placeholder="Username" required/>
        </div>

        <br/>
        <div class="w-75 form-group">
          {lockIcon}
          <label for="regPassword" class="h5 ml-2">Introdu o parola</label>
          <input type="password" class="form-control" id="regPassword" placeholder="Parola" required/>
        </div>



        <br/>
        <span class="mr-5 font-weight-bold" onClick={()=> window.open("/gdpr", "_blank")}> Termeni si conditii </span>

        <div class="form-check w-75">
          <input type="checkbox" class="form-check-input" id="regCheck" required/>
          <label class="form-check-label" for="regCheck"> Prin bifarea acestui checkbox sunt de acord informatiile prevazute in sectiunea Termeni si Conditii.</label>
        </div>


        <br/>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-lg" onClick={onClickRegister}>Inregistreaza-te</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
