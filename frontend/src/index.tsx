import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Acknowledge from './Acknowledge';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <div style={{textAlign: "center"}}>
        <Acknowledge />
    </div>
  </React.StrictMode>
);
