import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { fetchPlantNetPlantIdUrl, fetchIdResultsUrl, updateUserImages } from '../actions'
import { useHistory } from 'react-router-dom';

const IdUrl = () => {
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState('a picture of?');
  const dispatch = useDispatch();
  const history = useHistory();
  
  // const handleUrlInputChange = (e) => {
  //   setPreviewImage(e.target.value);
  // }
  // const handleTypeInputChange = (e) => {
  //   setPreviewType(e.target.value);
  // }

  const handleGetIdClick = () => {
    dispatch(fetchIdResultsUrl(images, types));
    dispatch(updateUserImages(images))
    history.push('/id/result');
  }

  const addImage = () => {
    setImages(images.concat(previewImage));
    setTypes(types.concat(previewType));
    setPreviewImage('');
    setPreviewType('a picture of?')
  }

  const generateSearchImageThumbnails = () => {
    return images.map((image, index) => {
      return (
        <div className='col-sm-2' key={index}>
          <img src={image} alt='' className="img-thumbnail"/>
        </div>)
    }
    )
  }

  const generateGetIdButton = () => (
    <div className='col-sm-6 offset-sm-3 text-center'>
      <button className="btn btn-primary btn-lg" type="button" onClick={handleGetIdClick}>Get ID</button>
    </div>
  )

  const generateUrlInputForm = () => {
    return (
      <div className="input-group mb-3">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="image location (url)" value={previewImage}   aria-label="image url" aria-describedby="basic-addon2" onChange={(e) => setPreviewImage(e.target.value)}/>
        </div>
        <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setPreviewType(e.target.value)} value={previewType} defaultValue='a picture of?'>
          <option selected>a picture of?</option>
          <option value="leaf">leaf</option>
          <option value="flower">flower</option>
          <option value="fruit">fruit</option>
          <option value="habit">habit</option>
          <option value="other">other</option>
        </select>
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button" onClick={addImage}>Add Image</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>provide url(s) for upload</h3>
          <p>You can provide up to 5 images of one plant for the id. Please note, our tech works best with photos at least 600x600p</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-5 offset-sm-3'>
          {images.length < 5 ? generateUrlInputForm() : <h3>Max Number of Images Reached</h3>}
        </div>
        <div className="col-sm-2">
          <img src={previewImage} alt='' className="img-thumbnail"/>
        </div>
      </div>

      <div className='row'>
        {images.length !== 0 ? generateGetIdButton() : null}
      </div>

      <div className='row mb-5'>
        <div className='col-sm-1'></div>
        {images.length !== 0 ? generateSearchImageThumbnails() : null}
      </div>
    </>
  );
}
export default IdUrl