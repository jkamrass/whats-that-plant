import React, { useState } from 'react';

const IdUrl = () => {
    const [query, setQuery] = useState(null);
    
    const handleChange = (e) => {
      setQuery(e.target.value);
    }
  
    const uploadLocal = () => {
      console.log('uploading');
      console.log(query)
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
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={uploadLocal}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-6 offset-md-3'>
          <img src={query} alt='' width={600}/>
        </div>
      </div>
    </>
  );
}
export default IdUrl