import { useParams, Switch, Route, Link } from 'react-router-dom';
import QuizMenu from './QuizMenu';
import BeginnerQuiz from './quizzes/BeginnerQuiz';
import DragAndDropQuiz from './quizzes/DragAndDropQuiz';


const QuizContainer = () => {
  
  
  return (
    <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <Switch>
            <Route exact path='/quiz'>
              <QuizMenu/>
            </Route>
            <Route exact path='/quiz/sprout-beginner'>
              <DragAndDropQuiz/>
            </Route>
            <Route exact path='/quiz/greenthumb-advanced'>
              <BeginnerQuiz/>
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default QuizContainer