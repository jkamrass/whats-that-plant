import { Link } from 'react-router-dom';

const QuizMenu = () => {
  return (
    <>
      <Link to='/'>
        <button className='btn btn-success'>Go Back</button>
      </Link>
      <div className="row">
        <div className='col-sm-8 offset-md-2 text-center'>
          <h1>Quizzes</h1>
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
            <button className='btn btn-success btn-xl'>Sprout's Quiz</button>
          </Link>
          <p>For beginners. Match 6 plants to their common names.</p>
        </div>
        <div className='col-sm-3 text-center'>
          <Link to='/quiz/greenthumb-advanced'>
            <button className='btn btn-success btn-xl'>Green Thumb's Quiz</button>
          </Link>
          <p>For gardeners. Select the right picture of the plant from 4 choices.</p>
        </div>
      </div>
    </>
  )
}
export default QuizMenu