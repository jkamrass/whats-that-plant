import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QuizData } from './QuizData';
import _ from 'lodash';
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import {fetchTrefleGameInformation, updateAnswer, updatePlantsDisplayed, fetchNewDNDImages, resetGameInformation} from '../../actions/index';
import DragAndDropImages from './DragAndDropImages';
import { useParams, Switch, Route, Link } from 'react-router-dom';

const DragAndDropQuiz = () => {
  const gameData = useSelector(state => state.plantDataForGame)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(resetGameInformation());
    dispatch(fetchTrefleGameInformation(6));
  }, [])


  if(gameData.length === 0) {
    return (
      <div>
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }
  
  return (
    <>
      <Link to='/quiz'>
        <button className='btn btn-success btn-lg'>go back</button>
      </Link>
      <h1>sprout's quiz</h1>
      <br></br>
      <DragAndDropImages gameData={gameData}/>
    </>
  )
}

export default DragAndDropQuiz;