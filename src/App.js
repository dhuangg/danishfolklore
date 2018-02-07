import React, { Component } from 'react';
import TabViewer from './components/TabViewer/TabViewer';
import Heading from './components/Heading/Heading.js'
import './App.css';


class App extends Component {

    constructor(){
        super();
        this.state = {
            menuItem:{}
        };
        this.menuHandler = this.menuHandler.bind(this);
    }

    menuHandler(dataObject){
        this.setState((prevState)=>{
            var newState = prevState;
            newState.menuItem = dataObject;
            return {menuItem:newState.menuItem}
        });
    }

    render() {
        return (
            <div className="App grid-container full">
                <Heading sendData={this.menuHandler}/>
                <TabViewer menuItem={this.state.menuItem}/>
            </div>
        );
    }
}

export default App;
