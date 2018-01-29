/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import Navigator from '../Navigator/Navigator';
import './TabViewer.css'

class TabViewer extends Component {

    constructor(){
        super();
        this.state = {

        };
    }

    render() {
        return (
            <div className="TabViewer">
                <Navigator/>
            </div>
        );
    }
}

export default TabViewer;