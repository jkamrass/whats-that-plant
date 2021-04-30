const IdResultTable = ({idResults}) => {
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

  return (
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
  )

}

export default IdResultTable;