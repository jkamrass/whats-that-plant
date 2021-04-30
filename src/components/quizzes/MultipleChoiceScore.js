const MultipleChoiceScore = ({gameData}) => {
  const writeGameMessage = (score) => {
    switch (true){
      case score === 10:
        return 'great job! you should be teaching us!'
      case score > 7:
        return 'well done!'
      case score > 5:
        return 'you\'re getting the hang of it!'
      case score > 3:
        return 'maybe a little more practice will help'
      default:
        return 'better luck next time, champ'
    }
  }
  
  if (gameData.numQuestions < 10) {
    return (
      <>
        <div className = 'row'>
          <div className='col-sm-8 offset-md-2'>
            <h3>Can you identify...</h3>
            <h1>{gameData.answer}</h1>
          </div>
        </div>
        
        <div className = 'row'>
          <div className='col-sm-8 offset-md-2'>
            <h3>Your Score</h3>
            <h1>{gameData.score}/{gameData.numQuestions}</h1>
          </div>
        </div>
      </>
    )
  }
  
  return (
    <>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>{writeGameMessage(gameData.score)}</h3>
          <div>
            <h1>Your score:</h1>
            <h1>{gameData.score}/{gameData.numQuestions}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default MultipleChoiceScore;