/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import Navigator from '../Navigator/Navigator';
import StoryView from '../StoryView/StoryView';
import './TabViewer.css'

class TabViewer extends Component {

    constructor(){
        super();
        this.state = {
            storyViews:[],
            storyPath:''
        };
        this.handleStoryPath = this.handleStoryPath.bind(this);
    }

    handleStoryPath(InputStoryPath){
        console.log('This is the story path!',InputStoryPath);
        var storyObject = {
            storyPath:InputStoryPath,
            active:true
        };
        this.setState((prevState)=>{
            var newStoryViews = prevState.storyViews;
            newStoryViews.push(storyObject);
           return {
               storyViews:newStoryViews
           }
        });
    }

    render() {
        console.log(this.state.storyViews);
        var storyView = this.state.storyViews.map((story,i)=> {
            return <StoryView storyPath={story.storyPath} key={i}/>;
        });
        return (
            <div className="TabViewer">
                <Navigator addStoryPath={this.handleStoryPath}/>
                {storyView}
            </div>
        );
    }
}

export default TabViewer;