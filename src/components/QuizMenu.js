import { useParams, Switch, Route, Link } from 'react-router-dom';

const QuizMenu = () => {
  return (
    <>
      <Link to='/'>
        <button className='btn btn-success'>go back</button>
      </Link>
      <div className="row">
        <div className='col-sm-8 offset-md-2 text-center'>
          <h1>quizzes</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>I'll try...</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-3 offset-md-3 text-center'>
          <Link to='/quiz/sprout-beginner'>
            <button className='btn btn-success btn-xl'>sprout's quiz</button>
          </Link>
          <p>for beginners. match 6 plants to their common names.</p>
        </div>
        <div className='col-sm-3 text-center'>
          <Link to='/quiz/greenthumb-advanced'>
            <button className='btn btn-success btn-xl'>green thumb's quiz</button>
          </Link>
          <p>for gardeners. select the right picture of the plant from 4 choices.</p>
        </div>
      </div>
    </>
  )
}
export default QuizMenu