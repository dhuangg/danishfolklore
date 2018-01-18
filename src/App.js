import React, { Component } from 'react';
import Navigator from './components/Navigator/Navigator';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
          <Navigator rawData = {this.props.keywords}>
              <p>This is a test of children props</p>
          </Navigator>
      </div>
    );
  }
}

export default App;
