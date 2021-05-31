import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppState  from './context/AppState'
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <AppState>
    <App />
    </AppState>  

  </React.StrictMode>,
  document.getElementById('root')
);


