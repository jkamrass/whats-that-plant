const imageChoices = ({answer, score, numQuestions, gameData, chooseAnswer }) => {
  if (numQuestions >= 10) {
    return (
      <>
      <div className='text-center'>
        <img src='https://media.istockphoto.com/photos/smiling-farmer-holding-a-watermelon-and-giving-thumb-up-picture-id478878265' alt='' width={450}/>
      </div>
      </>
    )
  }
  return (
    <div className = 'row'>
          {gameData.plantsDisplayed.map((plant) => {
            return (
              <div className='col-sm-3'>
                <span className = 'border border-success rounded border-4' key={plant.id}>
                  <img className='img-fluid' src={plant.plantData.imageUrl} alt={plant.plantData.commonName} onClick={chooseAnswer}/>
                </span>
              </div>
            )
          })}
      </div>
  )
}

export default imageChoices;