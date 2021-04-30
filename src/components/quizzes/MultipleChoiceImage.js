const MultipleChoiceImage = ({gameData, chooseAnswer, showAnswer }) => {
  if (gameData.numQuestions >= 10) {
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
                <span key={plant.id}>
                  {plant.plantData.commonName === gameData.answer ? null: null}
                  <img className='img-fluid rounded shadow-lg' style={{border: showAnswer ? `5px solid ${plant.plantData.commonName === gameData.answer ? '#5cb85c' : '#d42f26'}`: null}} src={plant.plantData.imageUrl} alt={plant.plantData.commonName} onClick={chooseAnswer} onError={(e)=>{e.target.onerror = null; e.target.src="https://image.freepik.com/free-vector/something-went-wrong-neon-text_118419-43.jpg"}}/>
                </span>
              </div>
            )
          })}
      </div>
  )
}

export default MultipleChoiceImage;