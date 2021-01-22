import React from 'react';
import './App.css';
import routes from './routes';
import Nav from './Components/Nav';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        {Nav}
        {routes}
      </div>
    )
  }
};

export default App;