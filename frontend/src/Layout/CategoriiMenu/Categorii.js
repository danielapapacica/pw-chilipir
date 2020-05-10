import React from 'react';
import './Categorii.scss';
import MyBtn from './MyBtn';
import Categories from './GetCategories';

import {Link} from "react-router-dom";


function Categorii(props) {

  let mycategories = Categories.categories;

  return (

    <div className="Categorii">
      {mycategories.map(({icon, title, link}) =>
        <Link to={`/filter/${link}`}>
            <MyBtn icon={icon} title={title}/>
        </Link>)}
    </div>

  );
}

export default Categorii;
