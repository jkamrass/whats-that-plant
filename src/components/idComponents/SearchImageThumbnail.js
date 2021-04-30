const SearchImageThumbnail = ({image, type, imageNumber, deleteImage}) => {
  const handleDeleteImageClick = () => {
    deleteImage(imageNumber)
  }
  return (
    <div className='col-sm-2' key={imageNumber}>
      <div className="card">
        <img src={image} alt='' className="card-img-top"/>
        <div className="card-body">
          <button type="button" className="close" aria-label="Close" onClick={handleDeleteImageClick}>
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="card-title text-left">Image #{imageNumber+1}</h5>
          <p className="card-text text-left">Plant Part: {type}</p>
        </div>
      </div>
    </div>
  )
}

export default SearchImageThumbnail