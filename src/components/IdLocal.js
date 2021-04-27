import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPlantNetPlantIdentificationForLocalImages } from '../actions/index';

const IdLocal = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    //dispatch(fetchPlantNetPlantIdentificationForLocalImages([e.target.files[0]], ['flower']))
  }

  const uploadLocal = () => {
    console.log('uploading');
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
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <img src={file} alt='' width={600}/>
        </div>
      </div>
    </>
  )
}
export default IdLocal