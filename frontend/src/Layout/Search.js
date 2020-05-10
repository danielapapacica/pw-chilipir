import React from 'react';
import './Search.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'

const districts = [
  "Arad", "Timisoara", "Deva", "Harghita", "Covasna", "Arges", "Bucureti", "Ilfov", "Giurgiu", "Dolj", "Bihor", "Ialomita"
];

function Search(props) {

  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const mapIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />

  return (
    <div className="Search">

      <div className="Search-content">

        <form class="form-inline ml-5">
          
          <div className="icon">{searchIcon}</div>
          <input class="form-control form-control-lg ml-3 mr-5 w-50" id="searchString" type="text" placeholder="Search"
          aria-label="Search"/>
 

        <div class="w-25 form-group">
          <div className="icon">{mapIcon}</div>
          <select id="adLocation" class="form-control-lg ml-3">
            <option selected>Judet</option>
            {districts.map( element => <option>{element}</option>)}
          </select>
        </div>

          <button type="button" class="btn btn-light btn-lg" onClick={props.onClick}>Cauta</button>

        </form>
      </div>
    </div>
  );
}

export default Search;
