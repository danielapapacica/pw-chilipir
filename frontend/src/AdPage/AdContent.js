import React from 'react';
import './AdContent.scss';

import PhotoAd from './PhotoAd';
import InfoAd from './InfoAd';



function AdContent(props) {

  const infoAd = {...props.infoAd};

  return (
    <div className="AdContent">


      <br/>
      <PhotoAd photo={infoAd.photo} folderId={infoAd._id} />
      <br/>
      <InfoAd title={infoAd.title} price={infoAd.price} description={infoAd.description} location={infoAd.location}/>
    </div>
    

  );
  
}

export default AdContent;