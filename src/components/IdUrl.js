import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { fetchPlantNetPlantIdUrl, fetchIdResultsUrl, updateUserImages, resetIdSearch } from '../actions'
import { useHistory } from 'react-router-dom';
import PreviewImage from './PreviewImage';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SearchImageThumbnail from './SearchImageThumbnail';

const imageInputSchema = Yup.object().shape({
  Image: Yup.string().required().url(),
  plantPart: Yup.string().required(),
});

const IdUrl = () => {
  const { register, handleSubmit, watch, setValue, formState:{ errors }} = useForm({
    resolver: yupResolver(imageInputSchema)
  });

  const [images, setImages] = useState([]);
  const [types, setTypes] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // Resets the search store to blank in case any previous data is there
  useEffect(() => dispatch(resetIdSearch()), []);

  const handleGetIdClick = () => {
    dispatch(fetchIdResultsUrl(images, types));
    dispatch(updateUserImages(images))
    history.push('/id/result');
  }

  const addImage = (data) => {
    setImages(images.concat(watch("Image")));
    setTypes(types.concat(watch("plantPart")))
    setValue("Image", '');
    setValue("plantPart", 'leaf');
  }

  const deleteImage = (indexOfImageToBeDeleted) => {
    setImages(images.filter((image, index) => index !== indexOfImageToBeDeleted));
    setTypes(types.filter((type, index) => index !== indexOfImageToBeDeleted));
  }

  const generateSearchImageThumbnails = () => images.map((image, index) => <SearchImageThumbnail image={image} imageNumber={index} type={types[index]} deleteImage={deleteImage}/>);

  const generateGetIdButton = () => (
    <div className='col-sm-6 offset-sm-3 text-center'>
      <button className="btn btn-success btn-lg" type="button" onClick={handleGetIdClick}>Get ID</button>
    </div>
  )

  const generateUrlInputForm = () => {
    return (
      <div className="mb-3">
        <label htmlFor="urlImage">Image:</label>
        <div className="form-group mb-2">
          <input type="text" className="form-control" id="urlImage" placeholder="image location (url)" aria-label="image url" aria-describedby="basic-addon2" {...register("Image")} />
          <small className="form-text text-muted">{errors.Image?.message}</small>
        </div>
        <label htmlFor="inputGroupSelect01">Part of Plant Displayed in Image (Leaf is safest bet if unsure):</label>
        <div className="input-group">
          <select className="custom-select" id="inputGroupSelect01" {...register("plantPart")}>
            <option value="leaf">leaf</option>
            <option value="flower">flower</option>
            <option value="fruit">fruit</option>
            <option value="bark">bark</option>
            <option value="habit">habit</option>
            <option value="other">other</option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={handleSubmit(addImage)}>Add Image</button>
          </div>
          {errors.plantPart?.message}
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
        {watch("Image") ? <PreviewImage imageUrl={watch("Image")}/> : null}
      </div>

      <div className='row'>
        {images.length !== 0 ? generateGetIdButton() : null}
      </div>

      <div className='row pb-5'>
        <div className='col-sm-1'></div>
        {images.length !== 0 ? generateSearchImageThumbnails() : null}
      </div>
    </>
  );
}
export default IdUrl