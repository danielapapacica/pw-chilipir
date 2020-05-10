import React, {useState, useEffect} from 'react';
import './FAQpage.scss';
import FAQbox from './FAQbox';
import axios from 'axios';



function FAQpage() {

  const [userRole, setUserRole] = useState("user");

  useEffect(()=>{
    
    if (localStorage.getItem("token") != null) {
      axios.get(`${process.env.REACT_APP_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(response => setUserRole(response.data.role))
      .catch(error => {setUserRole("user")});
    }

  }, []);

  return (
    <div className="FAQpage">

      <FAQbox role={userRole}/>
    </div>
  );
}

export default FAQpage;
