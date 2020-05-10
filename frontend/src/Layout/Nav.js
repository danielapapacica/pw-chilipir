import React, {useEffect, useState} from 'react';
import './Nav.scss';
import Search from './Search';
import Categorii from './CategoriiMenu/Categorii';
import AdsList from './../Ads/AdsList'
import axios from 'axios';

function Nav(props) {

  const [ads, setAds] = useState([]);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/ads`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setAds(response.data))
    .catch(error => alert("error"));
  }, []);


  return (
    <div className="Nav">

      <br></br><br></br><br></br><br></br>

      <Search></Search>
      
      <br></br><br></br>

      <Categorii></Categorii>

      <br/><br></br>
      Anunturi
      <br/><br></br>
      <AdsList type={2} list={ads}/>

    </div>
  );
}

export default Nav;
