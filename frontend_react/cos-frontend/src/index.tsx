// Dev: File cannot be changed. This is the Javascript entry point.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ConfigProvider } from './ConfigContext';

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ConfigProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
);

reportWebVitals();