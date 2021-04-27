import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { fetchPlantNetPlantIdentificationForLocalImages } from '../actions/index';

const IdLocal = () => {
    const [image, setImage] = useState(null);
    const [type, setType] = useState('other')
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    const handleType = (e) => {
      setType(e.target.value);
    }
  
    const uploadLocal = () => {
      dispatch(fetchPlantNetPlantIdentification(image, type));
      //dispatch(fetchPlantNetPlantIdentificationForLocalImages([e.target.files[0]], ['flower']))
    }

  return (
    <>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>local upload</h3>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <p>our tech works best with photos at least 600x600p</p>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" onClick={uploadLocal}>Upload</span>
            </div>
            <div className="custom-file">
              <input type='file' onChange={handleChange} id='inputGroupFile01'/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            </div>
            <select className="custom-select" id="inputGroupSelect01" onChange={handleType} defaultValue='a picture of?'>
              <option selected>a picture of?</option>
              <option value="leaf">leaf</option>
              <option value="flower">flower</option>
              <option value="fruit">fruit</option>
              <option value="habit">habit</option>
              <option value="other">other</option>
            </select>
            <button className="btn btn-outline-secondary" type="button" onClick={uploadLocal}>Submit</button>
          </div>
        </div>
      </div>
      
      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <img src={image} alt='' width={600}/>
        </div>
      </div>
    </>
  )
}
export default IdLocal