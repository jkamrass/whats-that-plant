import { useParams, Switch, Route, Link } from 'react-router-dom';
import QuizMenu from './QuizMenu';
import BeginnerQuiz from './quizzes/BeginnerQuiz';
import StandardQuiz from './quizzes/StandardQuiz';
import AdvancedQuiz from './quizzes/AdvancedQuiz';


const QuizContainer = () => {
  return (
    <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <Switch>
            <Route exact path='/quiz'>
              <QuizMenu/>
            </Route>
            <Route exact path='/quiz/sprout-beginner'>
              <BeginnerQuiz/>
            </Route>
            <Route exact path='/quiz/gardener-standard'>
              <StandardQuiz/>
            </Route>
            <Route exact path='/quiz/greenthumb-advanced'>
              <AdvancedQuiz/>
            </Route>
          </Switch>
        </div>
      </div>
  )
}

export default QuizContainer