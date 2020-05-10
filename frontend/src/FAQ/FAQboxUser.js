import React from 'react';
import './FAQboxUser.scss';
import FAQList from './FAQList';
import ContactForm from './ContactForm';


function FAQboxUser() {

  let contactform="";

  if (localStorage.getItem("token") != null) {
    contactform = 
    <>
    <h4 class="font-weight-noraml">
      Nu ai gasit raspunsul dorit?
    </h4>
    <p class="font-italic">
      Completeaza urmatorul formular de contact si o persoana din echipa de suport de va contacta de indata!
    </p>
    <ContactForm/>
    <br/><br/>
    </>;
  }

  return (
    <div className="FAQboxUser">

      <br/><br/><br/>
      
      <br/>
      <div className='FAQcontent'>

        <h1>Chilipir</h1>

        <p class="font-italic">Aici vei găsi informații despre crearea unui cont, adăugarea unui anunț și informații utile pentru a vinde cu succes pe chilipir.ro</p>

        <br/>

        <h3 class="font-weight-noraml">
          Intrebari frecvente
        </h3>

        <br/>

        <FAQList/>

        <br/><br/>
        {contactform}

      </div>

    </div>
  );
}

export default FAQboxUser;
