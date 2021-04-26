import { useParams, Switch, Route, Link } from 'react-router-dom';
import MainMenu from './MainMenu';
import IdMenu from './IdMenu';

import QuizContainer from './QuizContainer';

const MainPage = () => {
  return (
    <>
      <div className='row'>
        <div className='col-sm-4 offset-md-4'>
          <h1>What's That Plant?</h1>
        </div>
      </div>
      
      
      <Switch>
        <Route exact path='/'>
          <MainMenu/>
        </Route>
        <Route path='/ID'>
          <IdMenu/>
        </Route>
        <Route path='/quiz'>
          <QuizContainer/>
        </Route>
      </Switch>
    </>

  );
}

export default MainPage;