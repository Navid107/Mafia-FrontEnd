import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import io from 'socket.io-client';
import reportWebVitals from './reportWebVitals';

const socket = io('http://localhost:8080');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
