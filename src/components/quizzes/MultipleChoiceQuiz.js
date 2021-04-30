import { QuizData } from './QuizData';
import MultipleChoiceScore from './MultipleChoiceScore';
import MultipleChoiceImage from './MultipleChoiceImage';
import React, { useState, useEffect } from 'react';
import {fetchTrefleGameInformation, resetGameInformation, updateAnswer, fetchTrefleGameInformationFaster, updateScoreMultipleChoice} from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { useParams, Switch, Route, Link } from 'react-router-dom';
import { stubTrue } from 'lodash';

const MultipleChoiceQuiz = () => {
  const gameData = useSelector(state => state.plantDataForGame)
  const [showAnswer, setShowAnswer] = useState(false);
  //gameData.answer, .score, .numQuestions
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(resetGameInformation());
    dispatch(fetchTrefleGameInformation(4));
  }, [])


  if(gameData.length === 0) {
    return (
      <div>
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }
  

  const chooseAnswer = (e) => {
    let correct = false;
    if (e.target.alt === gameData.answer){
      correct = true
    }
    debugger;
    dispatch(updateScoreMultipleChoice(correct));
    setShowAnswer(true);
  }

  const nextQuestion = ()=>{
    dispatch(updateAnswer(gameData.answer));
    setShowAnswer(false);
  }

  const generateNextQuestionButton = () => {
    if (gameData.numQuestions < 10){
      return (
        <div className='row'>
          <div className = 'col-sm-4 offset-md-4 text-center'>
            {showAnswer ? <button className='btn btn-success' onClick={nextQuestion}>next question</button>: null}
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <Link to='/quiz'>
        <button className='btn btn-success'>go back</button>
      </Link>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <h1>green thumb's quiz</h1>
        </div>
      </div>
      <div></div>
      <MultipleChoiceImage answer={gameData.answer} score={gameData.score} numQuestions={gameData.numQuestions} gameData={gameData} chooseAnswer={chooseAnswer} showAnswer={showAnswer}/>
      {generateNextQuestionButton()}
      <MultipleChoiceScore answer={gameData.answer} score={gameData.score} numQuestions={gameData.numQuestions}/>
      
    </>
      
  )
}

export default MultipleChoiceQuiz