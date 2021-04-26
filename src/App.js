import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
