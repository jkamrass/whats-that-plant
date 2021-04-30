import { useSelector, useDispatch } from "react-redux"
import Spinner from "react-bootstrap/Spinner";
import {BOTH_FETCHES_FAILED} from '../../actions';
import NoResultsError from "./NoResultsError";
import IdResultTable from "./IdResultTable";
import {Link} from "react-router-dom";

const IdResult = () => {
  const idResults = useSelector(state => state.plantIdResults);
  const userData = useSelector(state => state.userData)

  if(Object.keys(idResults).length === 0) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }

  if(idResults.error === BOTH_FETCHES_FAILED) {
    return (
      <NoResultsError/>
    )
  }

  const generateUserImagesThumbnails = (userImages) => {
    return userImages.map((image) => (
      <div className="col-md-2">
        <img src={image} alt='' className='img-thumbnail'/>
      </div>
    ))
  }

  return (
    <>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-left">
          <h1>We think your plant is: </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5 offset-md-1 text-center">
          <h1 className="font-italic">
            {idResults?.scientificName}
          </h1>
          <h1>
            {idResults?.commonName}
          </h1>
          <IdResultTable idResults={idResults}/>
          <Link to='/id'>
              <button className='btn btn-success mr-3'>New Search</button>
          </Link>
          <Link to='/'>
              <button className='btn btn-success mr-3'>Home Page</button>
          </Link>
          <Link to='/quiz'>
              <button className='btn btn-success mr-3'>Ready for a quiz?</button>
          </Link>
        </div>
        <div className="col-md-5">
          <img src={idResults?.primaryImage} alt='Loading Image...' className='img-fluid rounded'/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-1">
          <h2>Your picture(s):</h2>
        </div>
      </div>
      <div className="row pb-5">
        <div className="col-md-1">
        </div>
        {generateUserImagesThumbnails(userData.userImageUrls)}
      </div>
    </>
  )
}

export default IdResult