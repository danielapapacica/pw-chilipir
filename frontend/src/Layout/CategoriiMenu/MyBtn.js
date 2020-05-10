import React from 'react';
import './MyBtn.scss';

function MyBtn(props) {

  return (
    <div className="MyBtn">
      <button type="button" class="btn btn-primary">
        <span className="logo">{props.icon} </span>
        <span className="textBtn"> {props.title}</span>
      </button>
    </div>

  );
}

export default MyBtn;
