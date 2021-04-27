import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import App from './App';
import { fetchTreflePlantInformation, fetchPlantNetPlantIdentificationForRemoteImages } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStoreWithMiddleware(reducers);
const dummyDataUrls = ['https://homegardenandhomestead.com/wp-content/uploads/2018/10/dandelions-1130x580.jpeg', 'https://www.wildfooduk.com/wp-content/uploads/2018/02/Dandy-15.jpg'];
const dummyDataOrgans = ['flower','leaf']
store.dispatch(fetchPlantNetPlantIdentificationForRemoteImages(dummyDataUrls, dummyDataOrgans));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
