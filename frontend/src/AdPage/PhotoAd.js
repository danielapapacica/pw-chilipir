import React from 'react';
import './PhotoAd.scss';
let pathDir="./../images/ads-photos/";


function PhotoAd(props) {


  return (
    <div className="PhotoAd">
     
     <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">


    <div class="carousel-item active">
      <img class="d-block w-100" src={`${pathDir}${props.folderId}/${props.photo[0]}`} alt="First slide"/>
    </div>

    {props.photo.map( Element => 
      
      <div class="carousel-item">
        <img class="d-block w-100" src={`${pathDir}${props.folderId}/${Element}`} alt=""/>
      </div>
    )}




  </div>


  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    </div>
    

  );
  
}

export default PhotoAd;