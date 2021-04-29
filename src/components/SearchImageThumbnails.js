const SearchImageThumbnails = ({images}) => {
    return images.map((image, index) => {
      return (
        <div className='col-sm-2' key={index}>
          <img src={image} alt='' className="img-thumbnail"/>
        </div>)
    }
    )
}

export default SearchImageThumbnails