import { QuizData } from './QuizData';
import BeginnerScoreCard from './BeginnerScoreCard';
import React, { useState } from 'react';

const BeginnerQuiz = () => {
  const randomValue = Math.floor(Math.random()*5);
  
  const [answer, setAnswer] = useState (QuizData.plants[randomValue].name);
  const [score, setScore] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);

  const resetAnswer = () => {
    const randomValue2 = Math.floor(Math.random()*5);
    setAnswer(QuizData.plants[randomValue2].name);
    setNumQuestions(numQuestions+1);
  }
  
  const logRandom = () => {
    
    console.log(randomValue);
    console.log(QuizData);
  }

  const chooseAnswer = (e) => {
    if (e.target.alt === answer){
      setScore(score+1)
      resetAnswer();
      return
    }
    resetAnswer();
  }

  return (
    <>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <h1 onClick={logRandom}>sprout's quiz</h1>
        </div>
      </div>

      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          {QuizData.plants.map((plant) => {
            return (
              <span className = 'border border-success rounded border-4'>
                <img src={plant.image} alt={plant.name} width = {155} onClick={chooseAnswer}/>
              </span>
            )
          })}
        </div>
      </div>
      <BeginnerScoreCard answer={answer} score={score} numQuestions={numQuestions}/>
    </>
      
  )
}

export default BeginnerQuiz