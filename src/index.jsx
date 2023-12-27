import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./assets/css/rasponsive.css"
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import NoneAnimatedRoutes from './components/NoneAnimatedRoutes';
import "./i18n"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NoneAnimatedRoutes />
        <AnimatedRoutes />
      </BrowserRouter>
    </Provider>

  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
