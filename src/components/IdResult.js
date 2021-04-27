import { useSelector, useDispatch } from "react-redux"
import { fetchTrefleInfoForId } from '../actions'

const IdResult = () => {
  const idResults = useSelector(state => state.plantIdResults);
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  if(Object.keys(idResults).length === 0) {
    return (
      <div>Loading...</div>
    )
  }
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

  const callTrefle = () => {
    dispatch(fetchTrefleInfoForId(idResults?.scientificName))
  }

  console.log(idResults);
  return (
    <div>
      <div className="row">
        <div className="col-md-5 offset-md-2 text-center">
          <h2>We think your plant is: </h2>
          <h1 className="font-italic">
            {idResults?.scientificName}
          </h1>
          <h3>
            Common names: {generateCommonNamesString(idResults.commonNames)}
          </h3>
          <h3>
            How sure are we: {generateCertaintyString(idResults.matchScore)}
          </h3>
        </div>
        <div className="col-md-5">
          <img src={idResults?.primaryImage} alt='' width={500}/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-1 text-left">
          <h2>Compare your picture with pictures for this species:</h2>
          <img src={userData.userImageUrl} alt='' width={200}/>
          <button className='btn btn-success' onClick={callTrefle}>get more information</button>
        </div>
      </div>
    </div>
  )
}

export default IdResult