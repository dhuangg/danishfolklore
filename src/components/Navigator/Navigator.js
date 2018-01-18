/**
 * Created by danielhuang on 1/13/18.
 */
import React, { Component } from 'react';
import NavigatorList from './NavigatorList';
// load in JSON data from file
import dataKeywords from '../../data/ckeywords.json'
import dataTango from '../../data/ctango_indices.json'
import './navigator.css'

class Navigator extends Component {

    constructor(){
        super();
        this.state = {
            data:{
                keywords: dataKeywords.keyword,
                tango: dataTango.tango_index,
                topicIndexNav: ['ETK Indice','Tangherlini Indices', 'Genres', 'Fieldtrips'],
                dataNav: ['People','Places','Things'],
            },
            lists:[
                {
                    array:['Data Navigator', 'Topic & Index Navigator'],
                    key:''
                },
                {
                    array:dataTango.tango_index,
                    key:'type'
                }
            ]
        };
        this.handleAddNavList = this.handleAddNavList.bind(this)
        //console.log(this.state.data.tango)
        //this.props give you values passed in from App.js/wherever Navigator is being called
    }

    handleAddNavList(list, elementKey){
       if(list==='Data Navigator'){
           //add dataNav to this.state.lists
           console.log(this.state.lists);
           this.setState((prevState) => {
               return {lists: prevState.lists.push({array:prevState.data.dataNav,key:''})}
           });
       } else if(list==='Topic & Index Navigator'){
           this.setState((prevState) => {
               return {lists: prevState.lists.push({array:prevState.data.topicIndexNav,key:''})}
           });
       } else {
           this.setState((prevState) => {
               return {lists: prevState.lists.push({array:list,key:elementKey})}
           });
       }

    }

    render() {
        //var handleAddNavList = this.handleAddNavList.bind(this);
        //something is becoming undefined when this list gets updated
        var navLists = this.state.lists.map((list,i) => {
            return <NavigatorList list={list.array} key={i} elementKey={list.key} addNav={this.handleAddNavList.bind(this)}/>
        });
        return (
            <div className="Navigator">
                {navLists}
            </div>
        );
    }
}

export default Navigator;