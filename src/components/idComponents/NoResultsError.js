import {Link} from "react-router-dom";

const NoResultsError = () => {
  return (
    <div className="row">
      <div className="col-sm-6 offset-sm-3">
        <h3>No Results Found</h3>
        <p>Please check your images</p>
        <Link to='/id'>
              <button className='btn btn-success mr-3'>New Search</button>
        </Link>
        <Link to='/'>
              <button className='btn btn-success'>Home Page</button>
        </Link>
      </div>
    </div>
  );
}

export default NoResultsError;