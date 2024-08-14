// Dev: File cannot be changed. This is the Javascript entry point.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AlertWidgetComponent from './Components/AlertWidget/AlertWidgetComponent'
import reportWebVitals from './reportWebVitals';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <AlertWidgetComponent/>
  </React.StrictMode>,
);

reportWebVitals();