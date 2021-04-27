import { useSelector } from "react-redux"

const IdResult = () => {
  const idResults = useSelector(state => state.plantIdResults);
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
      </div>
    </div>
  )
}

export default IdResult