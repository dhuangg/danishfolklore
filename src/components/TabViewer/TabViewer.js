/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import Navigator from '../Navigator/Navigator';
import StoryView from '../StoryView/StoryView';
import {getStoryByID, getPeopleByID} from "./model";
import './TabViewer.css'

class TabViewer extends Component {

    constructor(){
        super();
        this.state = {
            views:[],
            storyPath:'',
            inView:[]
        };
        this.handleStoryID = this.handleStoryID.bind(this);
        this.handlePPSID = this.handlePPSID.bind(this);
        this.tabController = this.tabController.bind(this);
        this.switchTab = this.switchTab.bind(this);
        this.closeTab = this.closeTab.bind(this);
        this.renderPDF = this.renderPDF.bind(this);
        this.renderPPF = this.renderPPF.bind(this);
    }

    componentWillMount(){
        var navigatorObject = {
            jsx: <Navigator addStoryID={this.handleStoryID} addPPSID={this.handlePPSID}/>,
            active: true,
            id:0,
            name:'Home',
            type:'home'
        };
        this.setState((prevState)=>{
            var newState = prevState.views;
            newState.push(navigatorObject);
            return {views:newState, inView:newState}
        });
    }


    renderStory(id){
        var storyObject = getStoryByID(id);
        return <StoryView story={storyObject}/>;
    }
    renderPPF(id,type,Name){
        if(type==='People'){
            getPeopleByID(id);
            return <div className='item'><h1>{Name}</h1></div>
        } else if(type==='Places'){

        } else if(type==='Fieldtrips'){

        }
    }
    //TODO:figure out a better way of calling this function
    renderPDF(filepath, name){
        var nameUpdated = true;
        if(this.state.inView.name === name){
            nameUpdated = false;
        } else {
            this.state.views.forEach((view)=>{
                if(view.name === name){
                    nameUpdated = false;
                }
            });
        }
        if(name !== undefined && nameUpdated){
            var PDFObject = {
                name:name,
                pdf:filepath,
                jsx:<div><h1>{name}</h1><h4>{filepath}</h4></div>,
                active:true
            };
            this.setState((prevState)=>{
                var newState = prevState;
                newState.views.forEach((view)=>{
                    view.active = false;
                });
                newState.views.push(PDFObject);
                return {views:newState.views, inView:[PDFObject]}
            });
        }
    }
    //7)A catch all function will take in an ID and name of the selected object
    // depending on what was selected (story, people, places, fieldtrips) add a different type of object to add to views and inView

    handleStoryID(InputStoryID,StoryName){
        console.log('This is the story ID!',InputStoryID);
        var storyObject = {
            jsx:this.renderStory(InputStoryID),
            id:InputStoryID,
            active:true,
            name:StoryName,
            type:'story'
        };
        this.setState((prevState)=>{
            var newStoryViews = prevState.views;
            newStoryViews.forEach((view)=>{
                view.active = false;
            });
            newStoryViews.push(storyObject);
           return {
               views:newStoryViews,
               inView:[storyObject]
           }
        });
    }
    handlePPSID(InputID, Name, Type){
        console.log(InputID,Name, Type);
        if(Type==='Stories'){
            this.handleStoryID(InputID,Name);
        } else {
            var itemObject = {
                //TODO: create people, places, and fieldtrip views
                //TODO: create associated people, places, stories navigator
                jsx:this.renderPPF(InputID,Type,Name),
                id:InputID,
                active:true,
                name:Name,
                type:Type
            };
            this.setState((prevState)=>{
                var newViews = prevState.views;
                newViews.forEach((view)=>{
                    view.active = false;
                });
                newViews.push(itemObject);
                return {
                    views:newViews,
                    inView:[itemObject]
                }
            });
        }
    }

    tabController(){
        for(var i=0; i<this.state.views.length;i++){
            if(this.state.views[i].active){
                return this.state.views[i].jsx;
            }
        }
    }

    switchTab(view){
        console.log('switching tabs!');
        this.setState((prevState)=>{
            var newViews = prevState.views;
            newViews.forEach((currentView)=>{
                if(currentView.name !== view.name){
                    currentView.active = false;
                } else {
                    currentView.active = true;
                    if(currentView.type === 'story'){
                        console.log(currentView.name);
                        currentView.jsx = this.renderStory(currentView.id);
                        view = currentView;
                    }
                }
            });
            //check if view has been deleted from list of views
            if(newViews.includes(view)){
                return { views:newViews, inView:[view] }
            } else {
                return{ views:newViews }
            }
        });
    }

    closeTab(view){
        console.log('closing tab!');
        //find 'view' in this.state.views and .inView, and delete it. if .inView then default to home tab
        this.state.views.forEach((currentView)=>{
            if(currentView === view){
                this.setState((prevState)=>{
                    var newState = prevState;
                    var removeViewIndex = newState.views.indexOf(view);
                    newState.views.splice(removeViewIndex,1);
                    if(newState.inView[0] === view){
                        newState.views[0].active = true;
                        return {
                            views:newState.views,
                            inView:[newState.views[0]]
                        }
                    }
                },()=>{
                    console.log(this.state.views)
                });
            }
        });
    }
    render() {
        return (
            <div className="TabViewer grid-container full">
                <div className="view">
                    {this.state.inView.map((view, i)=>{ return <div key={i}>{view.jsx}</div> })}
                    {this.renderPDF(this.props.menuItem.pdf,this.props.menuItem.name)}
                </div>
                <ul className="tabs">
                    {this.state.views.map((view,i)=>{
                        return <li onClick={(event)=>{event.preventDefault();this.switchTab(view);}}
                                   key={i} className={`${view.active ? 'active' : ''}`}>
                            {view.name}
                            <img src="https://png.icons8.com/material/50/000000/delete-sign.png" alt="Close Icon"
                                 className={`closeIcon ${view.name === 'Home'? 'noClose':''}`} onClick={(event)=>{event.preventDefault(); this.closeTab(view)}}/>
                        </li>})}
                </ul>
            </div>
        );
    }
}

export default TabViewer;