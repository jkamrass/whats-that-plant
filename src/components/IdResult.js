import { useSelector, useDispatch } from "react-redux"
import { fetchTrefleInfoForId } from '../actions'

const IdResult = () => {
  const idResults = useSelector(state => state.plantIdResults);
  const userData = useSelector(state => state.userData)
  const dispatch = useDispatch();

  // if(idResults) {
  //   dispatch(fetchTrefleInfoForId(encodeURIComponent(idResults?.scientificName)))
  // }

  const callTrefle = () => {
    dispatch(fetchTrefleInfoForId(idResults?.scientificName))
  }

  console.log(idResults);
  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1>
          Possible Match: {idResults?.scientificName}
        </h1>
        <h2>
          Common Names: {idResults?.commonNames}
        </h2>
        <h3>
          Likliehood: {idResults?.matchScore}
        </h3>
        <img src={userData.userImageUrl} alt='' width={200}/>
        <img src={idResults?.primaryImage} alt='' width={200}/>
        <button className='btn btn-success' onClick={callTrefle}>get more information</button>
      </div>
    </div>
  )
}

export default IdResult