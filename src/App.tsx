import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import SleepScore from './Pages/SleepScore';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App w-screen h-screen">
        <SleepScore></SleepScore>
      </div>
    </Provider> 
  );
}

export default App;
