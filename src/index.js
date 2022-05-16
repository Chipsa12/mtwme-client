import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from './components/reducers';
import { Provider } from 'react-redux';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
