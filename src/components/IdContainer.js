import { useParams, Switch, Route, Link } from 'react-router-dom';
import IdMenu from './IdMenu';
import IdLocal from './IdLocal';
import IdUrl from './IdUrl';
import IdResult from './IdResult';


const IdContainer = () => {
  return (
    <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
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
        </div>
      </div>
  )
}

export default IdContainer