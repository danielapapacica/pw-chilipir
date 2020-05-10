import React, {useState, useEffect} from 'react';
import './NewAdForm.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import ImageUploader from "react-images-upload";
import Axios from 'axios';

import Categories from './../Layout/CategoriiMenu/GetCategories';


const districts = [
  "Arad", "Timisoara", "Deva", "Harghita", "Covasna", "Arges", "Bucureti", "Ilfov", "Giurgiu", "Dolj", "Bihor", "Ialomita"
];



function NewAdForm(props) {

  const [pictures, setPictures] = useState([]);
  const [myFiles, setFiles] = useState([]);

  const onDrop = (pictures, files) => {
    setPictures(pictures);
    setFiles(files);
  };


  const mapIcon = <FontAwesomeIcon icon={faMapMarkerAlt} />
  let mycategories = Categories.categories;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
    Axios.get(`${process.env.REACT_APP_URL}/users/profile`, {
      headers: {
          Authorization: `Bearer ${localStorage.token}`,
      },
    })
    .then(response => setUserInfo(response.data))
    .catch(error => {});
    }
  }, []);


  let postImages = (id) => {
    for(let i = 0; i < myFiles.length; i++)
      fetch(myFiles[i])
      .then(res => res.blob())
      .then(blob => {
        const data = new FormData();
        const file = new File([blob], pictures[i].name);
        data.append('image', file, pictures[i].name);

        const config = {
          headers: { 'content-type': 'multipart/form-data',
                      Authorization: `Bearer ${localStorage.token}`
         }
        };
    
        Axios.post(`${process.env.REACT_APP_URL}/ads/upload/${id}`, data, config)
        .then(response => {
    
        }
        ).catch(error => console.log(error));
      });
  }

  let onClickSubmit = () => {
    let title = document.getElementById("adTitle");
    let description = document.getElementById("adDescr");
    let price = document.getElementById("price");
    let location = document.getElementById("adLocation");
    let category = document.getElementById("adCategory");

    if(title.checkValidity() && description.checkValidity() && price.checkValidity() && location.checkValidity() && category.checkValidity()){

      let obj = {
        photo: pictures.map(element => element.name),
        title: title.value,
        price: price.value,
        location: location.value,
        description: description.value,
        category: category.value,
        user_id: userInfo._id
      }

      Axios.post(`${process.env.REACT_APP_URL}/ads/`, obj, {
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then(response => {
        postImages(response.data);
      }
      ).catch(error => console.log(error));
    }
  };


  return (
    <div className="NewAdForm">

      <br/>
      <br/>
      <form>
        <div class="w-75 form-group">
          <label for="adTitle" class="h5 ml-2"> Titlul anuntului</label>
          <input type="text" class="form-control" id="adTitle" aria-describedby="emailHelp" placeholder="Titlu" required/>
        </div>


        <br/>
        <label for="adDescr" class="h5 ml-2">Adauga o descriere</label>
        <textarea class="form-control w-75" id="adDescr" rows="4" required/>

        <br/>
        <div class="w-75 form-group">
          <label for="price" class="h5 ml-2"> Pret (lei)</label>
          <input type="number" min="0" class="form-control" id="price" aria-describedby="emailHelp" placeholder="Pret"/>
        </div>


        <br/>
        <div class="w-75 form-group">
          {mapIcon}
          <label for="adLocation" class="h5 ml-2 w-50">Alege locatia de preluare (judetul)</label>
          <select id="adLocation" class="form-control">
            <option selected>{userInfo.location}</option>
            {districts.map( element => <option>{element}</option>)}
          </select>
        </div>


        <br/>
        <div class="w-75 form-group">
          <label for="adCategory" class="h5">Alege categoria</label>
          <select id="adCategory" class="form-control">
              {mycategories.map( ({icon, title, link}) =>
                <option value={link}>{title}</option>
              )}
            </select>
        </div>


        <br/><br/>
        <div class="form-group">
          <label for="adPhoto" class="h5">Fotografii</label><br/>
          <label for="adPhoto" class="font-weight-light">Incarca cateva forogtafii sugestive pe care le vor vedea utilizatorii</label>
        
          <ImageUploader
              {...props}
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".png"]}
              maxFileSize={5242880}
          />
        </div>


        <br/>
        <button class="btn btn-primary btn-lg" onClick={onClickSubmit}>Adauga anunt</button>
      </form>
      
    </div>
  );
}

export default NewAdForm;
