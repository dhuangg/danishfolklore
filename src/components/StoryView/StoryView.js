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
        this.renderAssociatedItems = this.renderAssociatedItems.bind(this);
        this.arrayTransformation = this.arrayTransformation.bind(this);
        this.renderStories = this.renderStories.bind(this);
        this.renderPlaces = this.renderPlaces.bind(this);
    }

    componentWillMount(){
        console.log(this.props.story);
    }

    clickHandler(id,name,type){
        this.props.addID(id,name,type);
    }

    arrayTransformation(item){
    var finalArray=[];
    if(Array.isArray(item)){
        finalArray = item;
    } else if(typeof item === 'object'){
        finalArray.push(item);
    }
    //if item is undefined (meaning there's no people/stories/places associated) then return empty array
    return finalArray;
    }

    renderStories(){
        var storyArray = this.arrayTransformation(this.props.story['stories_mentioned'].story);
        console.log(storyArray);
        return <div>
            <h4>Related Stories</h4>
            <ul>
                {storyArray.map((story,i)=>{
                    return <li key={i} className="associated-items" onClick={
                        (e)=>{e.preventDefault(); this.clickHandler(story['story_id'], story['full_name'],'Stories')}
                    }>{story['full_name']}</li>
                })}
            </ul>
        </div>
    }

    renderPlaces(){
        var placeArray = this.arrayTransformation(this.props.story['places'].place);
        return <div>
            <h4>Associated Places</h4>
            <ul>
                {placeArray.map((place,i)=>{
                    return <li key={i} className="associated-items" onClick={
                        (e)=>{e.preventDefault(); this.clickHandler(place['place_id'],place['name'],'Places')}
                    }>{place['display_name']}</li>
                })}
            </ul>
        </div>
    }

    renderAssociatedItems(){
        var storyList = this.props.story['stories_mentioned'];
        var placeList = this.props.story['places'];
        if(storyList !== [] && placeList !== []){
            return <div>
                {this.renderStories()}
                {this.renderPlaces()}
            </div>
        } else if(storyList !== []){
            return <div>
                {this.renderStories()}
            </div>
        } else if(placeList !== []){
            return <div>
                {this.renderPlaces()}
            </div>
        }
    }

    render() {
        return (
            <div className="StoryView grid-x">
                <div className="medium-8 cell">
                    <h3>{this.props.story.full_name}</h3>
                    <h4>{this.props.story.informant_full_name}</h4>
                    <div>{this.props.story.english_manuscript}</div>
                </div>
                <div>
                    {this.renderAssociatedItems()}
                </div>
            </div>
        );
    }
}

export default StoryView;