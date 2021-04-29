import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QuizData } from './QuizData';
import _ from 'lodash';
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import {fetchTrefleGameInformation, updateAnswer, updatePlantsDisplayed} from '../../actions/index';
import { useParams, Switch, Route, Link } from 'react-router-dom';


const DragAndDropImages = ({gameData, newGame}) => {

  const [choices, setChoices] = useState(_.shuffle(gameData.plantsDisplayed));
  const [answers, setAnswers] = useState(_.shuffle(gameData.plantsDisplayed));
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleOnDragEnd = (result) =>{
    if (!result.destination) return
    const items = Array.from(choices);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChoices(items);
  }

  const submitQuiz = () => {
    checkScore();
    setSubmitted(true);
  }

  const checkScore = () => {
    let rightAnswers = [];
    answers.forEach((answer, i)=> {
      if (answer === choices[i]){
        rightAnswers.push(1);
      } else {
        rightAnswers.push(0);
      }
    })
    setScore({
          correct: _.sum(rightAnswers),
          total: answers.length,
          byQuestion: rightAnswers
        })
  }

  const newSetClickHandler = () => {
    setSubmitted(false);
    newGame(choices)
  }

  return (
    <>
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='plants' direction='horizontal'>
          {(provided) => (
            <>
              <ul className='list-group list-group-horizontal' {...provided.droppableProps} ref={provided.innerRef}>
              {choices.map((plant, index) => {
                return (
                  <div className='col-sm-2'>
                    <Draggable key={plant.id} draggableId={plant.plantData.commonName} id={plant.id} index={index}>
                    {(provided) => (
                      <li ref ={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='list-group-item'>
                        <div>
                          <img src={plant.plantData.imageUrl} alt={`${plant.plantData.commonName}`} className='img-fluid'/>
                        </div>
                      </li>
                    )}
                    </Draggable>
                  </div> 
                )
              })}
              {provided.placeholder}
              </ul>
            </>
          )}
        </Droppable>
      </DragDropContext>
      <div className='row'>
          {answers.map((answer, index) => {
            return (
              <>
                <div className='col-sm-2'>
                  <h3 style={submitted ? {color: score.byQuestion[index] ? 'black': 'red'} : null}>{answer.plantData.commonName}</h3>
                </div>
              </>
            )
          })}
      </div>
      <div className='row'>
        <div className='col-sm-4 offset-md-4 text-center'>
          {submitted ? null : <button className='btn btn-success btn-lg' onClick={submitQuiz}>Submit</button>}
          {score ? <h3>your score: {score.correct}/{score.total}</h3> : null}
        </div>
      </div>
      </>
  )
}

export default DragAndDropImages;