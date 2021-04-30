import { Switch, Route } from 'react-router-dom';
import IdMenu from './IdMenu';
import IdLocal from './IdLocal';
import IdUrl from './IdUrl';
import IdResult from './IdResult';


const IdContainer = () => {
  return (
    <Switch>
      <Route exact path='/id'>
        <IdMenu/>
      </Route>
      <Route exact path='/id/local'>
        <IdMenu/>
        <IdLocal/>
      </Route>
      <Route exact path='/id/url'>
        <IdMenu/>
        <IdUrl />
      </Route>
      <Route exact path='/id/result'>
        <IdResult/>
      </Route>
    </Switch>
  )
}

export default IdContainer