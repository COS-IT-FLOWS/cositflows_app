// Dev: File cannot be changed. This is the Javascript entry point.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MyComponent from './Components/Alert/MyComponent';
import reportWebVitals from './reportWebVitals';
// import RainfallLegend from './Components/Legend/RainfallLegend/RainfallLegend';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <MyComponent/>
  </React.StrictMode>,
);

reportWebVitals();