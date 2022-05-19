import React from 'react';
import App from './App';
import {store} from './components/reducers';
import { Provider } from 'react-redux';
import { initializeApp } from "firebase/app";
import * as ReactDOMClient from 'react-dom/client';

import './index.css';


const firebaseConfig = {
  apiKey: "AIzaSyB_SiN53z9uQ4Xem14ocpGb2eMcauFg1I0",
  authDomain: "mtwme-a1870.firebaseapp.com",
  databaseURL: 'https://mtwme-a1870-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: "mtwme-a1870",
  storageBucket: "mtwme-a1870.appspot.com",
  messagingSenderId: "686907295735",
  appId: "1:686907295735:web:011a6ccf227c9ec8f6d0f2",
  measurementId: "G-RTJEC2GEVC"
};
// Initialize Firebase
initializeApp(firebaseConfig);

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
