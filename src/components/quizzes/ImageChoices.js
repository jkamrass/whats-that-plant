const imageChoices = ({answer, score, numQuestions, gameData, chooseAnswer }) => {
  if (numQuestions >= 5) {
    return (
      <>
        <img src='https://media.istockphoto.com/photos/smiling-farmer-holding-a-watermelon-and-giving-thumb-up-picture-id478878265' alt='' width={450}/>
      </>
    )
  }
  return (
    <div className = 'row'>
        <div className='col-sm-10 offset-md-1'>
          {gameData.plantsDisplayed.map((plant) => {
            return (
              <span className = 'border border-success rounded border-4' key={plant.id}>
                <img src={plant.plantData.imageUrl} alt={plant.plantData.commonName} width = {175} height={275} onClick={chooseAnswer}/>
              </span>
            )
          })}
        </div>
      </div>
  )
}

export default imageChoices;