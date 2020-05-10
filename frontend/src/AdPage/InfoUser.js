import React, {useEffect, useState} from 'react';
import './InfoUser.scss';
import axios from'axios';

import MyBtn2 from './MyBtn2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen} from '@fortawesome/free-solid-svg-icons'
import { faTimes} from '@fortawesome/free-solid-svg-icons'


const penIcon = <FontAwesomeIcon icon={faPen} />
const xIcon = <FontAwesomeIcon icon={faTimes} />



function InfoUser(props) {

  const infoUser = {...props.infoUser};
  const [myUser, setMyUser] = useState("empty");


  useEffect(() => {
    if (localStorage.getItem("token") != null) {

      axios.get(`${process.env.REACT_APP_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setMyUser(response.data))
    .catch(error => {setMyUser("empty")});
    }

  }, []);


  let onClickDeleteAd = () => {
      axios.delete(`${process.env.REACT_APP_URL}/ads/${props.adId}`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setMyUser(response.data))
    .catch(error => {setMyUser("empty")});
    }


  if(infoUser._id === myUser._id || myUser.role === "admin")
  return (
    <div className="InfoUser">
      <div className="InfoUserContent">
        <br/>
        <h2>{infoUser.name}</h2>
        <br/>
        <h3>Telefon</h3>
        <h4>{infoUser.phone}</h4>
        <br/>

        <MyBtn2 icon={penIcon} title="Modifica anuntul" color="blue"/>
        <br/>
        <MyBtn2 icon={xIcon} title="Sterge anuntul" color="red" onClick={onClickDeleteAd}/>
      </div>
    </div>
  );
  else
  return (
    <div className="InfoUser">
      <div className="InfoUserContent">
        <br/>
        <h2>{infoUser.name}</h2>
        <br/>
        <h3>Telefon</h3>
        <h4>{infoUser.phone}</h4>
        <br/>
      </div>
    </div>
  );
  
}

export default InfoUser;