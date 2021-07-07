import React from 'react';
import './App.css';

import { ReactComponent as Logo } from './static/logo.svg';
import { DynamicForm } from './components'
import {testData} from './testData'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <Logo />
        </div>
      </header>
      <div className="content-wrapper">
        <h1>Dynamic Form</h1>
        <DynamicForm formFields={testData} />
      </div>
    </div>
  );
}

export default App;
