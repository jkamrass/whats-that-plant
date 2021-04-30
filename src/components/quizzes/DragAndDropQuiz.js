import React, { useEffect } from 'react';
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from 'react-redux';
import {fetchTrefleGameInformation, resetGameInformation} from '../../actions/index';
import DragAndDropImages from './DragAndDropImages';
import { Link } from 'react-router-dom';

const DragAndDropQuiz = () => {
  const gameData = useSelector(state => state.plantDataForGame)
  const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(resetGameInformation());
    dispatch(fetchTrefleGameInformation(6));
  }, [])


  if(gameData.length === 0) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        Loading...
      </div>
    )
  }
  
  return (
    <>
      <Link to='/quiz'>
        <button className='btn btn-success'>Go Back</button>
      </Link>
      <h1>Sprout's Quiz</h1>
      <br></br>
      <DragAndDropImages gameData={gameData}/>
    </>
  )
}

export default DragAndDropQuiz;