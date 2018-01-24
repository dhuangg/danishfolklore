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
        //console.log(listsModel)
    }
    //remove sibling lists from visible navigator
    //TODO:remove previously selected element from path
    cleanNavList(selectedList){
        var selList = selectedList;
        //get indices of other list of same level and delete
        for(var i=0; i<this.state.lists.length;i++){
            if(selList.level<=this.state.lists[i].level){
                var pathElementToRemove = this.state.lists[i].name;
                var indexOfElement = this.state.lists.indexOf(pathElementToRemove);
                this.state.path.splice(indexOfElement-1,1);
                this.state.lists.splice(i,1);
                i--;
            }
        }
        //console.log(this.state.lists);
    }

    handleAddNavList(list){
        this.state.path.push(list);
        //this.state.path = this.state.path + list + ';';
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
            var storyArray = getStories(this.state.path);
            storyArray.map((story,i)=>{return <NavigatorStoryListItem story={story} key={i}/>});
            this.setState(()=>{
                return { storyList:storyArray.map((story,i)=>{return <NavigatorStoryListItem story={story} key={i}/>}) }
            });
           //if list isn't in listsModel then it means that we need to display the associated story with what was selected
           //console.log(list);
       }
    }

    render() {
        //var handleAddNavList = this.handleAddNavList.bind(this);
        var navLists = this.state.lists.map((list,i) => {
            return <NavigatorList list={list.childArray} elementKey={list.name} key={i} addNav={this.handleAddNavList.bind(this)}/>
        });
        return (
            <div className="Navigator">
                {navLists}
                <ul>
                    {this.state.storyList}
                </ul>
            </div>
        );
    }
}

export default Navigator;