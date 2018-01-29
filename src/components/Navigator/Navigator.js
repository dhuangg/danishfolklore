/**
 * Created by danielhuang on 1/13/18.
 */
import React, { Component } from 'react';
import NavigatorList from './NavigatorList';
import NavigatorStoryListItem from './NavigatorStoryListItem'
// load in JSON data from file
import {listsModel, getStories} from './model.js'
import './navigator.css'

class Navigator extends Component {

    constructor(){
        super();
        this.state = {
            path:[],
            //lists visible on view
            lists:[
                {
                    name:'MAIN',
                    childArray:['Data Navigator','Topic & Index Navigator'],
                    children:[this['Data Navigator'],this['Topic & Index Navigator']],
                    level:0
                },
            ],
            storyList:[]
        };
        this.handleAddNavList = this.handleAddNavList.bind(this);
    }
    //remove sibling lists from visible navigator
    cleanNavList(selectedList){
        var selList = selectedList;
        if(this.state.lists[this.state.lists.length-1].level === 3 && this.state.path.length===5){
            this.state.path.splice(3,1);
        }
        else if(this.state.lists[this.state.lists.length-1].level===2 && this.state.path.length===4){
            this.state.path.splice(2,1);
        }
        if (typeof selList==='object'){
            //get indices of other list of same level and delete
            for(var i=0; i<this.state.lists.length;i++){
                if(selList.level<=this.state.lists[i].level) {
                    console.log("current list name",this.state.lists[i].name);
                    var pathElementToRemove = this.state.lists[i].name;
                    //minus 1 because in the pathname array it doesn't contain
                    var indexOfElement = this.state.path.indexOf(pathElementToRemove);
                    this.state.path.splice(indexOfElement, 1);
                    this.state.lists.splice(i, 1);
                    i--;
                }
            }
            this.state.storyList = [];
        }
    }

    handleStoryQuery(story_id){
        var path = '../../data/stories_unconverted_js/'+ String(story_id)+'.json';
        this.props.addStoryPath(path);
    }

    handleAddNavList(list){
        this.state.path.push(list);
        if(list in listsModel){
            //check if topic index nav are both in this.state.lists
            this.cleanNavList(listsModel[list]);

           //add dataNav to this.state.lists
           this.setState((prevState) => {
               var newList = prevState.lists;
               newList.push(listsModel[list]);
               return {
                   lists: newList
               }
           });
       } else {
            var copyPath = this.state.path;
            this.cleanNavList(list);
            var storyArray = getStories(copyPath);
            storyArray.map((story,i)=>{return <NavigatorStoryListItem story={story} key={i}/>});

            this.setState(()=>{
                return { storyList:storyArray.map((story,i)=>{return <NavigatorStoryListItem story={story} key={i} getStoryData={this.handleStoryQuery.bind(this)}/>}) }
            });
           //if list isn't in listsModel then it means that we need to display the associated story with what was selected
       }
    }

    timeFilterHandler(){

    }

    render() {
        var navLists = this.state.lists.map((list,i) => {
            return <NavigatorList list={list.childArray} elementKey={list.name} key={i} addNav={this.handleAddNavList.bind(this)}/>
        });
        return (
            <div className="Navigator">
                <div className="navigation grid-x grid-padding-x">
                    {navLists}
                </div>
                <div className="grid-x">
                    <div className="mapping-component medium-8 cell">
                        <img src={require('./assets/etkmap.png')} alt="Placeholder Map Component"/>
                    </div>
                    <div className="stories medium-4 cell">
                        <form className="time-filter grid-x" onChange={this.timeFilterHandler.bind(this)}>
                            <div className="medium-1 text">From</div>
                            <input className="medium-4" type="text" name="FromYear" defaultValue="1887"/>
                            <div className="medium-1 text">To</div>
                            <input className="medium-4" type="text" name="ToYear" defaultValue="1899"/>
                        </form>
                        <h4>Associate Stories</h4>
                        <div className="stories-container">
                            <ul className="book">
                                {this.state.storyList}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Navigator;