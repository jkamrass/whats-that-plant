import { useParams, Switch, Route, Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import IdMenu from './idComponents/IdMenu';

import QuizContainer from './quizzes/QuizContainer';
import IdContainer from './idComponents/IdContainer';

const MainPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-2 offset-md-5 text-center'>
          <img className='img-fluid' src='/DatPlantLogo.jpg' alt=''/>
        </div>
      </div>
      
      
      <Switch>
        <Route exact path='/'>
          <MainMenu/>
        </Route>
        <Route path='/id'>
          <IdContainer/>
        </Route>
        <Route path='/quiz'>
          <QuizContainer/>
        </Route>
      </Switch>
    </div>

  );
}

export default MainPage;