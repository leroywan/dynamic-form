import React from 'react';
import './App.css';

import { DynamicForm } from './components'
import {testData} from './testData'

function App() {
  return (
    <div className="App">
      <DynamicForm name="Name" />
      <pre>{JSON.stringify(testData, null, 2)}</pre>
    </div>
  );
}

export default App;
