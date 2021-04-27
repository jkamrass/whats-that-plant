import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { fetchPlantNetPlantIdUrl } from '../actions'
import { useHistory } from 'react-router-dom';

const IdUrl = () => {
    const [image, setImage] = useState(null);
    const [type, setType] = useState('other')
    const dispatch = useDispatch();
    const history = useHistory();
    
    const handleChange = (e) => {
      setImage(e.target.value);
    }

    const handleType = (e) => {
      setType(e.target.value);
    }
  
    const uploadLocal = () => {
      dispatch(fetchPlantNetPlantIdUrl([image], [type]));
      history.push('/id/result');
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
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <img src={image} alt='' width={600}/>
        </div>
      </div>
    </>
  );
}
export default IdUrl