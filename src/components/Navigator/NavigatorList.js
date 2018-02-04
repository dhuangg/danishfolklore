/**
 * Created by danielhuang on 1/14/18.
 */
import React, { Component } from 'react';
import NavigatorItem from './NavigatorItem'

//creates list of clickable items based on a given list and key (i.e. type/name/etc.)
class NavigatorList extends Component {
    constructor(){
        super();
        this.createList = this.createList.bind(this);
        this.callNavigator = this.callNavigator.bind(this);
        this.state = {
            selectValue:'[Select]'
        };
    }

    callNavigator(list,elementKey){
        this.props.addNav(list,elementKey);
    }

    createList(list){
        console.log(list);
       // var filteredList = getSiblings(list,key);
        if(typeof list !== 'undefined'){
            //elementKey = key within data that you want to display (i.e. keyword_names)
            return list.map(function(value,i){
                return <NavigatorItem key={i} value={value} list={list} navigatorCall={this.callNavigator.bind(this)}/> }.bind(this));
        } else {
            return;
        }
    }

    createDropdown(list){
        return list.map(function(value,i){
            return <option key={i} value={value} list={list}>{value}</option> });
    }

    handleMenuChange(e){
        this.setState({selectValue:e.target.value});
        //pass selected value back to navigator
        this.props.addNav(e.target.value,'');
    }

    render() {
        return (
            <div className="NavigatorList medium-3 cell">
                {
                <form>
                    <select value={this.state.selectValue} onChange={this.handleMenuChange.bind(this)}>
                        {this.createDropdown.bind(this,this.props.list)()}
                    </select>
                </form>
                }
            </div>
        );
    }
}
/*
* <div className="arrow-down left"></div>
* */
export default NavigatorList;