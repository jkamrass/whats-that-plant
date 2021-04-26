import { useParams, Switch, Route, Link } from 'react-router-dom';

const QuizMenu = () => {
  return (
    <>
      <div className="row">
        <div className='col-sm-8 offset-md-2'>
          <p> we have a few options for quizzes. what fits you best?</p>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-8 offset-md-2'>
          <h3>I'll try...</h3>
        </div>
      </div>
      <div className='row'>
        <div className='col-sm-2 offset-md-3 text-center'>
          <Link to='/quiz/sprout-beginner'>
            <button className='btn btn-success btn-xl'>sprout's quiz</button>
          </Link>
          <p>for beginners. select an image to match the species provided.</p>
        </div>
        <div className='col-sm-2 text-center'>
          <Link to='/quiz/gardener-standard'>
            <button className='btn btn-success btn-xl'>gardener's quiz</button>
          </Link>
          <p>for folks who garden. select the correct name to match an image provided.</p>
        </div>
        <div className='col-sm-2 text-center'>
          <Link to='/quiz/greenthumb-advanced'>
            <button className='btn btn-success btn-xl'>green thumb's quiz</button>
          </Link>
          <p>for gods of the harvest. match the scientific names of 5 plants to 5 images.</p>
        </div>
      </div>
    </>
  )
}
export default QuizMenu