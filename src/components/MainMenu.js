import { useParams, Switch, Route, Link } from 'react-router-dom';


const MainMenu = () => {
  return (
    <>
    <div className="row">
        <div className='col-sm-8 offset-md-2'>
          <p>ever see a plant and want to know what it is? want to increase your knowledge of the plant kingdom in general? we got your back.</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>I want to...</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-1 offset-md-5'>
          <Link to='/ID'>
            <button className='btn btn-success btn-xl'>ID a Plant</button>
          </Link>
        </div>
        <div className='col-sm-2'>
          <Link to='/quiz'>
            <button className='btn btn-success btn-xl'>Take a Plant Quiz</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MainMenu