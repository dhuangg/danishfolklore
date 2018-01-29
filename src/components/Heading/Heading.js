/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import './Heading.css'

class Heading extends Component {

    constructor(){
        super();
        this.state = {
            storyPath:''
        };
    }

    render() {
        return (
            <div className="Heading grid-x grid-padding-x">
                <div className="medium-2 cell">Search</div>
                <div className="medium-offset-5 medium-5 large-offset-6 large-3 cell">
                    <div className="grid-x grid-margin-x">
                        <img src={require('./assets/DENM0001.png')} className="flag medium-3 cell" alt="Danish Flag"/>
                        <h5 className="danish-folklore medium-3 cell">Danish Folklore</h5>
                        <h6 className="etk medium-6 cell">The Evald Tang <br/> Kristiansen Collection</h6>
                    </div>
                </div>
                <div className="Hamburger-Menu medium-1 cell">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Heading;