import React, {useEffect, useState} from 'react';
import './ProfileBox.scss';
import {Link} from "react-router-dom";
import axios from "axios";



function ProfileBox(props) {

    const [userInfo, setUserInfo] = useState({});


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setUserInfo(response.data))
    .catch(error => {});
  }, []);

  let onClickDisconect = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  }
  


  return (
    <div className="ProfileBox">

        <br/><br/><br/><br/>

      <div className='ProfileContent'>

        <h1>{userInfo.name}</h1>
        <h5 class="font-weight-light">{userInfo.username}</h5>
          <br/>
          <p class="font-italic h3">Informatii despre profil</p>

          <p class="font-italic">Email: {userInfo.email}</p>
          <p class="font-italic">Telefon: {userInfo.phone}</p>
      </div>


      
      <div className='Disconect'>

        <Link to={`/`}>
        <button type="button" class="btn btn-danger btn-lg" onClick={onClickDisconect}>Deconectare</button>
        </Link>

      </div>

       

    </div>
  );
}

export default ProfileBox;
