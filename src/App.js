import React from 'react';
import logo from './logo.svg';

import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './static/css/base.css'
import './static/css/login.css'
import './static/css/landing.css'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
