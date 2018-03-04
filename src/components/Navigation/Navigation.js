/**
 * Created by danielhuang on 2/24/18.
 */
import React, { Component } from 'react';
import NavigatorComponent from './NavigatorComponent';
import SearchComponent from './SearchComponent';
import {ontologyToDisplayKey, ontologyToID, dateFilterHelper} from './model';
import './navigation.css'

class Navigation extends Component {

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
            displayItemsList:[],
            itemsList:[],
            fromDate:1887, //default start date
            fromSelect:false,
            toDate: 1899, //default end date
            toSelect:false,
            timeFilterOn:false,
            displayOntology:'',
        };
        this.displayItems = this.displayItems.bind(this)
    }

    displayList(list, displayKey, idKey, ontology){
        if(ontology === 'undefined'){
            return list.map((item,i)=>{
                return <li key={i} className={this.state.displayOntology}
                           onClick={(e)=>{ e.preventDefault();
                               this.handleIDQuery(item[idKey],item[displayKey],this.state.displayOntology)}}>
                    {item[displayKey]}
                </li>
            });
        } else {
            return list.map((item,i)=>{
                return <li key={i} className={ontology}
                           onClick={(e)=>{ e.preventDefault();
                               this.handleIDQuery(item[idKey],item[displayKey],ontology)}}>
                    {item[displayKey]}
                </li>
            });
        }
    }

    handleIDQuery(id, name, type){
        console.log(id,name,type);
        this.props.addID(id,name,type);
    }

    displayItems(items, ontology){
        var displayKey = ontologyToDisplayKey[ontology];
        var idKey = ontologyToID[ontology];
        this.setState(()=>{
            return {
                displayOntology:ontology,
                itemsList:items,
                displayItemsList: this.displayList(items,displayKey,idKey,ontology)
            }
        },()=>{
            if(this.state.timeFilterOn && typeof items !== 'undefined'){
                this.updateItems.bind(this)()
            }
        });
    }

    updateItems(){
        var displayKey = ontologyToDisplayKey[this.state.displayOntology];
        var idKey = ontologyToID[this.state.displayOntology];
        if(this.state.timeFilterOn){
            //filter by time
            var itemsWithinFieldtrips = dateFilterHelper(this.refs.fromDate.value, this.refs.toDate.value,this.state.displayOntology);
            //if an item is in the itemsWithinFieldtrips, change what is displayed, NOT items list
            var displayList = [];
            //if it isn't a fieldtrip
            if(this.state.displayOntology !== 'Fieldtrips'){
                var idsWithinFieldtrips = [];
                if(typeof itemsWithinFieldtrips !== 'undefined'){
                    itemsWithinFieldtrips.forEach((item)=>{
                        idsWithinFieldtrips.push(item[idKey]);
                    });
                    this.state.itemsList.forEach((item)=>{
                        //if something in the current items list is in the range of the date
                        if(idsWithinFieldtrips.indexOf(item[idKey]) > -1){
                            displayList.push(item);
                        }
                    });
                    this.setState({
                        displayItemsList:this.displayList(displayList,displayKey,idKey,'undefined')
                    })
                }
            } else { //else it is a fieldtrip
                this.setState({
                    displayItemsList:this.displayList(itemsWithinFieldtrips,displayKey,idKey,'Fieldtrips')
                })
            }
        } else if(!this.state.timeFilterOn) {
            this.setState({
                displayItemsList:this.displayList(this.state.itemsList,displayKey,idKey,'undefined')
            })
        }

    }

    //sets time filters
    timeFilterHandler(){
        // console.log(this.refs.fromDate.value,this.refs.toDate.value,this.state.timeFilterOn);
        var fromDateForm = parseInt(this.refs.fromDate.value);
        var toDateForm = parseInt(this.refs.toDate.value);
        //check if the dates are valid dates (4 digits, between 1887 and 1899)
        if( fromDateForm >= 1887 && toDateForm <= 1899){
            //check if time filter was switched
            if(this.refs.TimeFilterOn.checked !== this.state.timeFilterOn){
                //if they are, then set this.state variables
                this.setState({
                    timeFilterOn:!this.state.timeFilterOn,
                    fromDate:fromDateForm,
                    toDate:toDateForm,
                }, ()=>{
                    this.updateItems.bind(this)()
                })
            } else {
                //just change from/to dates
                this.setState({
                    fromDate:fromDateForm,
                    toDate:toDateForm,
                }, ()=>{
                    this.updateItems.bind(this)()
                })
            }
        }
    }

    timeInputClickHandler(year){
        //display slider
        if(year === 'ToYear'){
            //set this.state.toSelect = true
            this.setState(()=>{return {toSelect:true}});
        } else {
            //set this.state.fromSelect = true
            this.setState(()=>{return {fromSelect:true}});
        }
    }
    timeInputEnd(year){
        console.log(this.refs.fromDate.value);
        //display slider
        if(year === 'toDate'){
            //set this.state.toSelect = true
            this.setState(()=>{return {toSelect:false}},
                ()=>{this.timeFilterHandler.bind(this)});
        } else {
            //set this.state.fromSelect = true
            this.setState(()=>{return {fromSelect:false}},
                ()=>{this.timeFilterHandler.bind(this)});
        }
    }

    render() {
        return (
            <div className="Navigation">
                <div className="navigation grid-x grid-padding-x">
                    <div className="medium-3 cell dataNavigation">
                        <SearchComponent handleDisplayItems={this.displayItems.bind(this)}/>
                        <NavigatorComponent handleDisplayItems={this.displayItems.bind(this)}/>
                    </div>
                    <div className="medium-4 cell AssociatedStoriesViewer">
                        <form className="time-filter grid-x">
                            <div className="medium-2 cell text"><b>From</b></div>
                            <div className="medium-2 cell">
                                <input className="year" type="text" name="FromYear" ref="fromDate"
                                       value={this.state.fromDate}
                                   onChange={this.timeFilterHandler.bind(this)} onClick={(e)=>{ e.preventDefault();
                                    this.timeInputClickHandler.bind(this)('FromYear')}}/>
                                <input className={`slider ${this.state.fromSelect ? 'active' : '' }`}
                                       type="range" min="1887" max={this.state.toDate} value={this.state.fromDate}
                                       onChange={this.timeFilterHandler.bind(this)}
                                       onMouseUp={(e)=>{e.preventDefault(); this.timeInputEnd.bind(this)('fromDate')}}
                                       ref="fromDate"
                                       id="myRange"/>
                            </div>
                            <div className="medium-1 cell text"><b>To</b></div>
                            <div className="medium-2 cell">
                                <input className="year" type="text" name="ToYear" ref="toDate"
                                       value={this.state.toDate}
                                       onChange={this.timeFilterHandler.bind(this)} onClick={(e)=>{ e.preventDefault();
                                           this.timeInputClickHandler.bind(this)('ToYear')}}/>
                                <input className={`slider ${this.state.toSelect ? 'active' : '' }`}
                                       type="range" min={this.state.fromDate} max="1899" value={this.state.toDate}
                                       onChange={this.timeFilterHandler.bind(this)}
                                       onMouseUp={(e)=>{e.preventDefault(); this.timeInputEnd.bind(this)('toDate')}}
                                       ref="toDate"
                                       id="myRange"/>
                            </div>
                            <div className="medium-3 medium-offset-1 cell">
                                <input type="checkbox" name="Time Filter Switch" checked={this.state.timeFilterOn}
                                       className="timeSwitch"
                                       onChange={this.timeFilterHandler.bind(this)} ref="TimeFilterOn"/>&nbsp;
                                <span style={{fontSize:".8em"}}>Enable Timeline</span><br/>
                            </div>
                        </form>
                        <div className="stories-container">
                            <ul className="book">
                                {this.state.displayItemsList}
                            </ul>
                        </div>
                    </div>
                    <div className="medium-5 cell">

                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;