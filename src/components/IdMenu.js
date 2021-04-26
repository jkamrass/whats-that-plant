import { useParams, Switch, Route, Link } from 'react-router-dom';
import IdLocal from './IdLocal';
import IdUrl from './IdUrl'

const IdMenu = () =>{
  return (
    <>
      <div className="row">
        <div className='col-sm-8 offset-md-2'>
          <p> at 'what's that plant?' we use photo recognition and machine learning technology to ID plants. How would you prefer to ID yours?</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>I'd like to...</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-1 offset-md-5'>
          <Link to='/ID/url'>
            <button className='btn btn-success btn-xl'>use photo url</button>
          </Link>
        </div>
        <div className='col-sm-2'>
          <Link to='/ID/local'>
            <button className='btn btn-success btn-xl'>upload my own photo</button>
          </Link>
        </div>
      </div>
      <div className = 'row'>
        <div className='col-sm-8 offset-md-2'>
          <Switch>
            <Route exact path='/ID/local'>
              <IdLocal/>
            </Route>
            <Route exact path='/ID/url'>
              <IdUrl/>
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default IdMenu;