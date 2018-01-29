/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import story from '../../data/stories_unconverted_js/15.json';
import './StoryView.css'

class StoryView extends Component {

    constructor(){
        super();
        this.state = {
            StoryObject:{},
            StoryPath:''
        };
    }


    loadStoryJSON(callback){
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', this.props.storyPath, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    componentDidMount(){

        console.log('component is mounting!');
        this.state.StoryPath = this.props.storyPath;
        //TODO:load story json file given by storyPath and save it to this.state.StoryObject
        this.loadStoryJSON(function(response) {
            // Parse JSON string into object
            console.log(response);
            //var actual_JSON = JSON.parse(response);
            //this.state.StoryObject = actual_JSON;
        });
    }

    displayStoryHandler(e){
        e.preventDefault();
        console.log(this.state.StoryObject)
    }

    render() {
        console.log('story object: ',this.state.StoryObject);
        return (
            <div className="StoryView">
                <h3>hi</h3>
                <h1>{this.props.storyPath}</h1>
                <button onClick={this.displayStoryHandler.bind(this)}>Load Story</button>
            </div>
        );
    }
}

export default StoryView;