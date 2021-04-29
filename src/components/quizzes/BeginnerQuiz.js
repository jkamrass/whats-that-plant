import { QuizData } from './QuizData';
import BeginnerScoreCard from './BeginnerScoreCard';
import ImageChoices from './ImageChoices';
import React, { useState, useEffect } from 'react';
import {fetchTrefleGameInformation, updateAnswer} from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";

const BeginnerQuiz = () => {
  const gameData = useSelector(state => state.plantDataForGame)
  //gameData.answer, .score, .numQuestions
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(fetchTrefleGameInformation());
  }, [])


  if(gameData.length === 0) {
    return (
      <div>
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }

  //setAnswer(gameData[randomValue].plantData.name)

  
    // setAnswer(gameData[randomValue2].plantData.name);
    // setNumQuestions(numQuestions+1);
  

  const chooseAnswer = (e) => {
    let correct = false
    if (e.target.alt === gameData.answer){
      correct = true;
    }
    dispatch(updateAnswer(correct));
  }

  return (
    <>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <h1>sprout's quiz</h1>
        </div>
      </div>

      <ImageChoices answer={gameData.answer} score={gameData.score} numQuestions={gameData.numQuestions} gameData={gameData} chooseAnswer={chooseAnswer}/>
      <BeginnerScoreCard answer={gameData.answer} score={gameData.score} numQuestions={gameData.numQuestions}/>
    </>
      
  )
}

export default BeginnerQuiz