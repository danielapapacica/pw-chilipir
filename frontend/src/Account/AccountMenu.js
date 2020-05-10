import React from 'react';
import './AccountMenu.scss';

import {Link} from "react-router-dom";

const activity = {
  "active" : "h4 nav-link active",
  "inactive" : "h4 nav-link"
}

function AccountMenu(props) {

  const firstTab = activity[props.first];
  const secondTab = activity[props.second];

  return (
    <div className="AccountMenu">

      <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
          <Link to={`/account`}>
            <span class={firstTab}>Intra in cont</span>
          </Link>
        </li>
        <li class="nav-item">
          <Link to={`/account/register`}>
            <span class={secondTab}>Inregistreaza-te</span>
          </Link>
        </li>
      </ul>

    </div>
  );
}

export default AccountMenu;
