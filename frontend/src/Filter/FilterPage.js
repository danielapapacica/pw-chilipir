import React, {useState, useEffect} from 'react';
import './FilterPage.scss';
import Search from './../Layout/Search';
import FilterSimple from './FilterSimple';
import AdsList from '../Ads/AdsList';
import Axios from 'axios'; 


let typeList = 1;
let typeGrid = 2;


function FilterPage(props) {

  const [listingAdsType, setListingState] = useState(typeList);
  const [ads, setAds] = useState([]);

  let setListingGrid = () => {
    setListingState(typeGrid);
  }

  let setListingList = () => {
    setListingState(typeList);
  }

  

  let getCustomAds = () => {
    let searchString = document.getElementById("searchString");
    let location = document.getElementById("adLocation");
    let category = document.getElementById("categoryselector");
    let min = document.getElementById("lowerPrice");
    let max = document.getElementById("higherPrice");
    let orderByString = document.getElementById("orderBy");

    if(min.checkValidity() && max.checkValidity()){

      let minField = min.value;
      let maxField = max.value;
      let orderField = orderByString.value;
      let catField = category.value;
      let locField = location.value;
      let searchField = searchString.value;

      Axios.get(`${process.env.REACT_APP_URL}/ads/custom?min=${minField}&max=${maxField}&orderBy=${orderField}&category=${catField}&location=${locField}&searchString=${searchField}`)
      .then(response => {setAds(response.data)}
      ).catch(error => console.log(error));
      
    }
  };

  useEffect( () => {
    getCustomAds();
  }, []);



  return (
    <div className="FilterPage">
      <br/><br/><br/>
      
      <Search onClick ={getCustomAds}/>

      <br/>
      <FilterSimple  setList={setListingList} setGrid={setListingGrid} categorytitle={props.categorytitle}/>

      <br/>
      <br/>
      <br/>

      <AdsList type={listingAdsType} list={ads}/>

    </div>
  );
}

export default FilterPage;
