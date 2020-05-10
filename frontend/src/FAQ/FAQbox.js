import React, {useState, useEffect} from 'react';
import FAQboxSuport from './FAQboxSuport';
import FAQboxUser from './FAQboxUser';


function FAQbox(props) {

  let role = props.role;


  if(role === "suport"){
      return( <FAQboxSuport/>);
  }else
      return( <FAQboxUser/>);

}

export default FAQbox;
