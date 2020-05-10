import React from 'react';
import './FAQboxSuport.scss';
import FAQList from './FAQList';
import AnsweredList from './AnsweredList';
import UnansweredList from './UnansweredList';
import MarkedList from './MarkedList';


function FAQboxSuport() {


  return (
    <div className="FAQboxSuport">

      <br/><br/><br/><br/>

      <div className='FAQcontent'>

        <h1>Chilipir</h1>

        <p class="font-italic">Aici vei putea raspunde, in calitate de suport, intrebarilor adresate de utilizatori pe pagina chilipir.ro</p>

        <br/>

        <h3 class="font-weight-noraml">
          In trecut
        </h3>

        <br/>

        <h5 class="font-italic">
          Marcate
        </h5>

        <br/>

        <MarkedList type="marked"/>

        <br/>


        <h5 class="font-italic">
          Nemarcate
        </h5>

        <br/>

        <MarkedList type="unmarked"/>

        <br/><br/>

        <h3 class="font-weight-noraml">
          In asteptare
        </h3>

        <br/>

        <UnansweredList/>

        <br/><br/><br/><br/>

      </div>

    </div>
  );
}

export default FAQboxSuport;
