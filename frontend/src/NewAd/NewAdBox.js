import React, {useState, useEffect} from 'react';
import './NewAdBox.scss';
import NewAdForm from './NewAdForm';


function NewAdBox() {

  
  return (
    <div className="NewAdBox">
        <br/><br/><br/>
        <h1>Adaugare anunt</h1>

        <NewAdForm/>

    </div>
  );
}

export default NewAdBox;
