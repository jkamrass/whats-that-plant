import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { fetchPlantNetPlantIdUrl, fetchIdResultsUrl, updateUserImage } from '../actions'
import { useHistory } from 'react-router-dom';

const IdUrl = () => {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('other');
  const [numOfImagesForSearch, setNumOfImagesForSearch] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleChange = (e) => {
    setImage(e.target.value);
  }

  const handleType = (e) => {
    setType(e.target.value);
  }

  const uploadLocal = () => {
    dispatch(fetchIdResultsUrl([image], [type]));
    dispatch(updateUserImage(image))
    history.push('/id/result');
  }

  const addUrlInputGroup = () => {
    numOfImagesForSearch < 5 ? setNumOfImagesForSearch(numOfImagesForSearch+1) : alert("Can't upload more than 5 images for search")
  }

  const generateSingleUrlInput = () => {
    return (
      <div className="input-group mb-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="image location (url)"    aria-label="image url" aria-describedby="basic-addon2" onChange={handleChange}/>
        </div>
        <select className="custom-select" id="inputGroupSelect01" onChange={handleType} defaultValue='a picture of?'>
          <option selected>a picture of?</option>
          <option value="leaf">leaf</option>
          <option value="flower">flower</option>
          <option value="fruit">fruit</option>
          <option value="habit">habit</option>
          <option value="other">other</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={uploadLocal}>Submit</button>
        </div>
      </div>
    )
  }

  const generateUrlInputForm = (numOfUrlInputGroups) => {
    const urlInputForm = [];
    for (let i = 0; i < numOfUrlInputGroups; i++) {
      urlInputForm.push(generateSingleUrlInput());
    }
    return urlInputForm;
  }

  return (
    <>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>provide url for upload</h3>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <p>our tech works best with photos at least 600x600p</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <div className='mb-3'>
            <button className="btn btn-primary mr-2" type="button" onClick={addUrlInputGroup}>Add Another Image</button>
            <button className="btn btn-primary" type="button">Get ID</button>
          </div>

          {generateUrlInputForm(numOfImagesForSearch)}
        </div>
      </div>

      

      <div className='row'>
        <div className='col-sm-2 offset-md-3'>
          <img src={image} alt='' className="img-thumbnail"/>
        </div>
      </div>
    </>
  );
}
export default IdUrl