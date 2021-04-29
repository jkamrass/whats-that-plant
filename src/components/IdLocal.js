import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { fetchIdResultsLocal, fetchPlantNetPlantIdLocal, updateUserImages } from '../actions/index';
import { useHistory } from 'react-router-dom';

const IdLocal = () => {
  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewType, setPreviewType] = useState('a picture of?');
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleFileInput = (e) => {
    setPreviewImage({
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0])
    })
    //setImage();
    //setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const addImage = () => {
    setImages(images.concat(previewImage));
    setTypes(types.concat(previewType));
    setPreviewImage('');
    setPreviewType('a picture of?')
  }


  const handleGetIdClick = () => {
    dispatch(fetchIdResultsLocal(images, types));
    dispatch(updateUserImages(images.map((image) => image.imageUrl)))
    history.push('/id/result');
  }

  const generateGetIdButton = () => (
    <div className='col-sm-6 offset-sm-3 text-center'>
      <button className="btn btn-primary btn-lg" type="button" onClick={handleGetIdClick}>Get ID</button>
    </div>
  )

  const generateSearchImageThumbnails = () => {
    return images.map((image, index) => {
      return (
        <div className='col-sm-2' key={index}>
          <img src={image.imageUrl} alt='' className="img-thumbnail"/>
        </div>)
    }
    )
  }

  const generateLocalInputForm = () => (
    <div className="input-group mb-3">

      <div className="custom-file">
        <input type='file' onChange={handleFileInput} id='inputGroupFile01'/>
        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
      </div>
      <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setPreviewType(e.target.value)} defaultValue='a picture of?'>
        <option selected>a picture of?</option>
        <option value="leaf">leaf</option>
        <option value="flower">flower</option>
        <option value="fruit">fruit</option>
        <option value="habit">habit</option>
        <option value="other">other</option>
      </select>
      <button className="btn btn-outline-secondary" type="button" onClick={addImage}>Add Photo</button>
    </div>
  )

  return (
    <>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>local upload</h3>
          <p>You can provide up to 5 images of one plant for the id. Please note, our tech works best with photos at least 600x600p</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          {images.length < 5 ? generateLocalInputForm() : <h3>Max Number of Images Reached</h3>}  
        </div>
        <div className="col-sm-2">
          <img src={previewImage?.imageUrl} alt='' className="img-thumbnail"/>
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
  )
}
export default IdLocal


  // const [image, setImage] = useState(null);
  // const [previewImage, setPreviewImage] = useState(null);
  // const [type, setType] = useState('other');
  // const history = useHistory();
  // const dispatch = useDispatch();

  // const generateUrlInputForm = () => {
  //   return (
  //     <div className="input-group mb-3">
  //       <div className="input-group mb-3">
  //         <input type="text" className="form-control" placeholder="image location (url)" value={previewImage}   aria-label="image url" aria-describedby="basic-addon2" onChange={(e) => setPreviewImage(e.target.value)}/>
  //       </div>
  //       <select className="custom-select" id="inputGroupSelect01" onChange={(e) => setPreviewType(e.target.value)} value={previewType} defaultValue='a picture of?'>
  //         <option selected>a picture of?</option>
  //         <option value="leaf">leaf</option>
  //         <option value="flower">flower</option>
  //         <option value="fruit">fruit</option>
  //         <option value="habit">habit</option>
  //         <option value="other">other</option>
  //       </select>
  //       <div className="input-group-append">
  //         <button className="btn btn-outline-secondary" type="button" onClick={addImage}>Add Image</button>
  //       </div>
  //     </div>
  //   )
  // }

  // const handleType = (e) => {
  //   setType(e.target.value);
  // }
  // const uploadLocal = () => {
  //   // dispatch(fetchPlantNetPlantIdLocal([image], [type], previewImage));
  //   dispatch(fetchIdResultsLocal([image], [type], previewImage));
  //   dispatch(updateUserImages(previewImage));
  //   history.push('/id/result');
  //   //dispatch(fetchPlantNetPlantIdentificationForLocalImages([e.target.files[0]], ['flower']))
  // }