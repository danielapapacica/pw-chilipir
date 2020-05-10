import React from 'react';
import './MyBtn2.scss';
import {Link} from 'react-router-dom';

function MyBtn2(props) {

  let classBtn="";

  if(props.color==="red")
    classBtn = "btn btn-danger";
  else
    classBtn = "btn btn-primary";

  return (
    <div className="MyBtn2">
      <Link to="/">
        <button type="button" class={classBtn} onClick={props.onClick}>
          <span className="logo">{props.icon} </span>
          <span className="textBtn"> {props.title}</span>
        </button>
      </Link>

    </div>

  );
}

export default MyBtn2;
