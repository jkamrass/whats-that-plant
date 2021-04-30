import { useSelector, useDispatch } from "react-redux"
import { fetchTrefleInfoForId } from '../actions'
import Spinner from "react-bootstrap/Spinner";

const IdResult = () => {
  const idResults = useSelector(state => state.plantIdResults);
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  if(Object.keys(idResults).length === 0) {
    return (
      <div>
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }

  // const callTrefle = () => {
  //   dispatch(fetchTrefleInfoForId(idResults?.scientificName))
  // }
  // if(Object.keys(idResults).length !== 0) {
  //   callTrefle();
  // }

  // if(idResults) {
  //   dispatch(fetchTrefleInfoForId(encodeURIComponent(idResults?.scientificName)))
  // }

  const generateCommonNamesString = (commonNamesArr) => {
    return commonNamesArr.reduce((finalStr, name) => `${finalStr}, ${name}`)
  }

  const generateCertaintyString = (matchScore) => {
    if (matchScore >= .8) {
      return "We're pretty darn sure"
    } else if (matchScore >= .5) {
      return "We're fairly sure"
    } else if (matchScore < .5) {
      return "Hmmm, with a better picture we might be more sure"
    }
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
        <div className="col-md-4 offset-md-2 text-center">
          <h1 className="font-italic">
            {idResults?.scientificName}
          </h1>
          <h1>
            {idResults?.commonName}
          </h1>
          <table className="table table-hover table-bordered table-striped">
            <tbody>
              <tr>
                <th scope='row'>
                  Genus:
                </th>
                <td>
                  <span className="font-italic">{idResults?.genus}</span>
                </td>
              </tr>
              <tr>
                <th scope='row'>
                  Family:
                </th>
                <td>
                  {idResults?.commonFamilyName} (<span className="font-italic">{idResults?.family}</span>)
                </td>
              </tr>
              <tr>
                <th scope='row'>
                  Other Names:
                </th>
                <td>
                  {generateCommonNamesString(idResults.commonNames)}
                </td>
              </tr>
              <tr>
                <th scope='row'>
                  How sure are we?
                </th>
                <td>
                  {generateCertaintyString(idResults.matchScore)}
                </td>
              </tr>
              <tr>
                <th scope='row'>
                  Useful Links:
                </th>
                <td>
                <p><a href={idResults?.plantNetPageUrl} target="_blank" rel="noopener noreferrer">{idResults.plantNetPageUrl ? `${idResults?.scientificName} - PlantNet` : null} </a></p>
                <p><a href={idResults?.wikiUrl} target="_blank" rel="noopener noreferrer">{idResults.wikiUrl ? `${idResults?.scientificName} - Wikipedia` : null}</a></p>
                </td>
              </tr>
            </tbody>
          </table>
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