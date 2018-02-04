/**
 * Created by danielhuang on 1/13/18.
 */
import React, { Component } from 'react';
import NavigatorList from './NavigatorList';
import NavigatorStoryListItem from './NavigatorStoryListItem'
import AssociatedStoriesViewer from "./AssociatedStoriesViewer";
// load in JSON data from file
import {listsModel, getItems} from './model.js'
import './navigator.css'
import PPSListItem from "./PPSListItem";

class Navigator extends Component {

    constructor(){
        super();
        this.state = {
            path:[],
            //lists visible on view
            lists:[
                {
                    name:'MAIN',
                    childArray:['Data Navigator','Topic & Index Navigator','[Select]'],
                    children:[this['Data Navigator'],this['Topic & Index Navigator']],
                    level:0
                },
            ],
            itemsList:[]
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
                    console.log("current list name", this.state.lists[i].name);
                    var pathElementToRemove = this.state.lists[i].name;
                    //minus 1 because in the pathname array it doesn't contain
                    var indexOfElement = this.state.path.indexOf(pathElementToRemove);
                    this.state.path.splice(indexOfElement, 1);
                    this.state.lists.splice(i, 1);
                    i--;
                }
            }
            this.state.itemsList = [];
        }
        var indexOfRemovedList=-1;
        //1) check if there's anything in this.state.path that isn't in this.state.lists that isn't the selected list
        this.state.path.forEach((pathItem, i)=>{
           var indexOfPathItem=-1;
           this.state.lists.forEach((list,j)=>{
              if(list.name===pathItem){
                  indexOfPathItem=j;
              }
           });
           if(typeof selList === 'object'){
               if(indexOfPathItem===-1 && pathItem!==selList.name){indexOfRemovedList=i;}
           } else{
               if(indexOfPathItem===-1 && pathItem!==selList){indexOfRemovedList=i;}
           }
        });
        if(indexOfRemovedList!==-1){this.state.path.splice(indexOfRemovedList,1);}
    }

    handleStoryQuery(story_id, full_name){
        var id = String(story_id);
        this.props.addStoryID(id, full_name);
    }
    handlePPSQuery(pps_id, name, type){
        this.props.addPPSID(pps_id,name,type);
    }

    handleAddNavList(list){
        this.state.path.push(list);
        if(list in listsModel){
            //check if topic index nav are both in this.state.lists
            this.cleanNavList(listsModel[list]);
            // if list is people, places, or fieldtrips, just display them on the results
            if(list==='People' || list==='Places'|| list==='Stories'|| list==='Fieldtrips'){
                console.log(listsModel[list]);
                var itemsIdentifier={
                    'Fieldtrips':{nameKey:'fieldtrip_name',idKey:'fieldtrip_id'},
                    'People':{nameKey:'full_name',idKey:'person_id'},
                    'Places':{nameKey:'name',idKey:'place_id'},
                    'Stories':{nameKey:'full_name',idKey:'story_id'}
                };
                var itemsList = listsModel[list].children;
                this.setState(()=>{
                    return {itemsList:itemsList.map((item,i)=>{
                            return <PPSListItem itemObj={item} nameKey={itemsIdentifier[list].nameKey} idKey={itemsIdentifier[list].idKey}
                                                key={i} type={list} getPPS={this.handlePPSQuery.bind(this)}/>
                        })}
                })
            } else{
                //add dataNav (the new list for dropdown menu) to this.state.lists
                this.setState((prevState) => {
                    var newList = prevState.lists;
                    newList.push(listsModel[list]);
                    console.log(newList);
                    return {
                        lists: newList
                    }
                });
            }
        } else {
            //If the list is not in the listsModel, that means we need to get the associated stories, people, places, fieldtrips
            //a) object of if last item of the path, is it a people, places, fieldtrips, or stories
            var itemIdentifier = {
                'Genres':'stories',
                'Tangherlini Indices':'stories',
                'ETK Indices':'stories',
            };
            var returnListType='';
            this.state.path.forEach((pathItem)=>{
                if(pathItem in itemIdentifier){
                    returnListType = itemIdentifier[pathItem];
                }
            });
            //1) send pathArray and if it is a people, places, fieldtrips, or stories list that we need
            this.cleanNavList(list);
            var storyArray = getItems(this.state.path, returnListType);
            //5) generate NavigatorListItems based on the array of objects given. Props: object, name_key => the key for getting the name of the people, places, stories, fieldtrip item
            this.setState(()=>{
                return { itemsList:storyArray.map((story,i)=>{return <NavigatorStoryListItem story={story} key={i} getStoryData={this.handleStoryQuery.bind(this)}/>}) }
            });
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
                        <div className="AssociatedStoriesViewer grid-x">
                            <h4>Associated Results</h4>
                            <div className="stories-container">
                                <ul className="book">
                                    {this.state.itemsList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Navigator;