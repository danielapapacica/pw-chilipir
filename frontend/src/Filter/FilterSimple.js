import React, {useState, useEffect} from 'react';
import './FilterSimple.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faTh } from '@fortawesome/free-solid-svg-icons';

import Categories from './../Layout/CategoriiMenu/GetCategories';
import {useHistory} from "react-router-dom";

const districts = [
  "Arad", "Timisoara", "Deva", "Harghita", "Covasna", "Arges", "Bucureti", "Ilfov", "Giurgiu", "Dolj", "Bihor", "Ialomita"
];


let orderOptions = [
  "Cele mai noi",
  "Cele mai vechi",
  "Cele mai ieftine",
  "Cele mai scumpe"
];


let activeString = "btn btn-primary active ";
let inactiveString = "btn btn-primary inactive ";


function FilterSimple(props) {

  let mycategories = Categories.categories;
  const history = useHistory();


  const listIcon = <FontAwesomeIcon icon={faList} />
  const gridIcon = <FontAwesomeIcon icon={faTh} />

  const [firstBtnState, setFirstBtn] = useState(activeString.concat(" ml-3"));
  const [secondBtnState, setSecondBtn] = useState(inactiveString);

  let onClickFirstBtn = () => {
    setFirstBtn(activeString.concat("ml-3"));
    setSecondBtn(inactiveString);
    props.setList();
  }

  let onClickSecondBtn = () => {
    setFirstBtn(inactiveString.concat("ml-3"));
    setSecondBtn(activeString);
    props.setGrid();
  }

  let changeCategoryPage = () => {
    let selectedBox = document.getElementById("categoryselector");
    let selectedValue = selectedBox.options[selectedBox.selectedIndex].value;

    if(selectedValue !== "/")
      history.push(selectedValue);
    // else{
    //   history.push(selectedValue);
    //   history.push("/filter");
    // }

  };

  let currentCategoryLink ="";

  if(props.categorytitle != null)
    currentCategoryLink = mycategories.find(item=>item.title === `${props.categorytitle}`).link;


  return (
    <div className="FilterSimple">

      <br/>
      <div class="ml-5 h2">Filtre</div>


      <form class="form-inline">
          <div class="form-group mb-2">
            <label for="categoryselector" class="h5 ml-5">Categorie</label>
            <select id="categoryselector" class="form-control ml-3" onChange={changeCategoryPage}>
              <option selected value={currentCategoryLink}> {props.categorytitle}</option>
              <option value="/"> Toate</option>
              {mycategories.map( ({icon, title, link}) =>
                <option value={link}>{title}</option>
              
              )}
            </select>
          </div>

          <div class="form-group">
              <label for="lowerprice" class="h5 ml-5"> Pret </label>
              <input type="number" min="0" class="form-control ml-3" id="lowerPrice" placeholder="De la"/>

              <input type="number" min="0" class="form-control ml-2" id="higherPrice" placeholder="Pana la"/>
          </div>


          <br/>
          <div class="form-group mb-2">
            <label for="orderBy" class="h5 ml-5">Ordoneaza dupa</label>
            <select id="orderBy" class="form-control ml-3">
              <option selected value="noi">{orderOptions[0]} </option>
              <option value="vechi"> {orderOptions[1]}</option>
              <option value="ieftine"> {orderOptions[2]}</option>
              <option value="scumpe"> {orderOptions[3]}</option>
            </select>
          </div>

          <div class="form-group mb-2">
            <label class="h5 ml-5">Afisare</label>
            <button type="button" class={firstBtnState} onClick={onClickFirstBtn}>{listIcon}</button>
            <button type="button" class={secondBtnState} onClick={onClickSecondBtn}>{gridIcon}</button>
          </div>

          
      </form>



    </div>
  );
}

export default FilterSimple;
