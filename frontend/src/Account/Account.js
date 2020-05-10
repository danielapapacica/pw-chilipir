import React from 'react';
import './Account.scss';
import AccountMenu from './AccountMenu';
import AccountBox from './AccountBox';

function Account(props) {

  return (
    <div className="Account">

      <AccountMenu first="active" second="inactive"/>
      <AccountBox/>


    </div>
  );
}

export default Account;
