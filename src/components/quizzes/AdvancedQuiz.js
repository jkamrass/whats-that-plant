import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { QuizData } from './QuizData';
import _ from 'lodash';

const AdvancedQuiz = () => {
  const [choices, setChoices] = useState(_.shuffle(QuizData.plants));
  const [answers, setAnswers] =useState(_.shuffle(QuizData.plants.map(plant => plant.name)));
  const [score, setScore] = useState(0);
  

  const handleOnDragEnd = (result) =>{
    if (!result.destination) return
    const items = Array.from(choices);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChoices(items);
  }

  const checkScore = () => {
    let rightAnswers = 0;
    answers.forEach((answer, i)=> {
      if (answer === choices[i].name){
        rightAnswers +=1;
      }
    })
    setScore(rightAnswers);
  }

  return (
    <>
      <br></br>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='plants' direction='horizontal'>
          {(provided) => (
            <>
              <ul className='list-group list-group-horizontal' {...provided.droppableProps} ref={provided.innerRef}>
              {choices.map((plant, index) => {
                return (
                  <div className='col-sm-2'>
                    <Draggable key={plant.id} draggableId={plant.id} index={index}>
                    {(provided) => (
                      <li ref ={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='list-group-item'>
                        <div>
                          <img src={plant.image} alt={`${plant.name}`} className='img-fluid'/>
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
          {answers.map(answer => {
            return (
              <>
                <div className='col-sm-2'>
                  <h3>{answer}</h3>
                </div>
              </>
            )
          })}
      </div>
      <div className='row'>
        <div className='col-sm-4 offset-md-4 text-center'>
          <button className='btn btn-success btn-lg' onClick={checkScore}>Submit</button>
          <h3>your score: {score/answers.length*100}%</h3>
        </div>
      </div>
    </>
  )
}

export default AdvancedQuiz;