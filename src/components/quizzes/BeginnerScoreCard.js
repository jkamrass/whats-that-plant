import { useParams, Switch, Route, Link } from 'react-router-dom';


const BeginnerScoreCard = ({answer, score, numQuestions}) => {
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
  
  if (numQuestions < 10) {
    return (
      <>
        <div className = 'row'>
          <div className='col-sm-8 offset-md-2'>
            <h3>can you identify...</h3>
            <h1>{answer}</h1>
          </div>
        </div>
        
        <div className = 'row'>
          <div className='col-sm-8 offset-md-2'>
            <h3>your score</h3>
            <h1>{score}/{numQuestions}</h1>
          </div>
        </div>
      </>
    )
  }
  
  return (
    <>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>{writeGameMessage(score)}</h3>
          <div className='border border-success'>
            <h1>Your score:</h1>
            <h1>{score}/{numQuestions}</h1>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default BeginnerScoreCard;