import React, {useState, useEffect} from 'react';
import './AdPage.scss';
import InfoUser from './InfoUser';
import AdContent from './AdContent';
import axios from 'axios';


function AdPage({match}) {

    let id = match.params.id;
    const [myAd, setAd] = useState({    
    photo: [],
    title: "",
    price: 0,
    location: "",
    description: "",
    category:"",
    user: {}
    });

    const [myUser, setUser] = useState({});


    useEffect(() => {
      axios.get(`${process.env.REACT_APP_URL}/ads/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(response => {setAd(response.data); setUser(response.data.user);})
      .catch(error => alert("error"));
    }, []);


    return (
        <div className="AdPage">
            <br/><br/><br/>
            <div className="AdPageContent">
                <AdContent infoAd = {myAd}/>
                <InfoUser infoUser = {myUser} adId={id}/>
            </div>

        </div>

        
    );
  
}

export default AdPage;