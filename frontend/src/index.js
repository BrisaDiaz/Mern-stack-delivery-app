import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppState  from './context/AppState'
import CartState  from './context/cart_context/CartState'
import App from './App';


ReactDOM.render(
  <React.StrictMode>
    <AppState>
      <CartState>
    <App />
    </CartState>
    </AppState>

  </React.StrictMode>,
  document.getElementById('root')
);


