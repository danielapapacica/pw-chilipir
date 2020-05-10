import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';

import * as serviceWorker from './serviceWorker';

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Helmet } from 'react-helmet';

const TITLE = 'Chilipir';


const options = {
  timeout: 5000,
  transition: 'scale'
}

ReactDOM.render(

  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <Helmet>
          <title>{ TITLE }</title>
    </Helmet>
    <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
