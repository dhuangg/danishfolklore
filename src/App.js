import React, { Component } from 'react';
import TabViewer from './components/TabViewer/TabViewer';
import Heading from './components/Heading/Heading.js'
import './App.css';


class App extends Component {

    render() {
        return (
            <div className="App grid-container full">
                <Heading/>
                <TabViewer/>
            </div>
        );
    }
}

export default App;
