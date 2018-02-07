/**
 * Created by danielhuang on 2/6/18.
 */
import React, { Component } from 'react';
import './PeopleView.css'

class PeopleView extends Component {

    constructor(){
        super();
        this.state = {
            PeopleObject:{},
            PeoplePath:''
        };
    }

    render() {
        return (
            <div className="PeopleView grid-x">
                <div className="medium-8 cell">
                    <h3>{this.props.story.full_name}</h3>
                    <h4>{this.props.story.informant_full_name}</h4>
                    <div>{this.props.story.english_manuscript}</div>
                </div>
            </div>
        );
    }
}

export default PeopleView;