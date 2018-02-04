/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import './StoryView.css'

class StoryView extends Component {

    constructor(){
        super();
        this.state = {
            StoryObject:{},
            StoryPath:''
        };
    }

    render() {
        return (
            <div className="StoryView grid-x">
                <div className="medium-8 cell">
                    <h3>{this.props.story.full_name}</h3>
                    <h4>{this.props.story.informant_full_name}</h4>
                    <div>{this.props.story.english_manuscript}</div>
                </div>
            </div>
        );
    }
}

export default StoryView;