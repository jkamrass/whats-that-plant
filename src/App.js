import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={MainPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
