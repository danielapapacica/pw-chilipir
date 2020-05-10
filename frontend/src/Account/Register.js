import React from 'react';
import './Register.scss';
import AccountMenu from './AccountMenu';
import RegisterBox from './RegisterBox';

function Register(props) {

  return (
    <div className="Register">

      <AccountMenu first="inactive" second="active"/>
      <RegisterBox/>


    </div>
  );
}

export default Register;
