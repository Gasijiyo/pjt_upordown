import React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById("root"));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>    
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />          
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root') 
// );