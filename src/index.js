import React from 'react';
import ReactDOM from 'react-dom/client';
// ודא שהם נטענים לפני כל קובץ CSS אחר שלך
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import MyProvider from './myContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
        <PrimeReactProvider>
            <Router>
      <MyProvider>   <App />    </MyProvider>

            </Router>
        </PrimeReactProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
