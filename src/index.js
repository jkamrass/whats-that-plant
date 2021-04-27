import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import App from './App';
import { fetchTreflePlantInformation, fetchPlantNetPlantIdentification } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);
//store.dispatch(fetchPlantNetPlantIdentification('test'));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
