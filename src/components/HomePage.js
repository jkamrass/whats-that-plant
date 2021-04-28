import { useParams, Switch, Route, Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import IdMenu from './IdMenu';

import QuizContainer from './QuizContainer';
import IdContainer from './IdContainer';

const MainPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-4 offset-md-4'>
          <h1>What's That Plant?</h1>
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