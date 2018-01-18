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
    }

    getSiblings(list,key){
        if(key===''){
            return list;
        }
        if(typeof list !== 'undefined' && typeof key !== 'undefined'){
            var prev = [];
            for(var i=0;i<list.length;i++){
                var curr = list[i][key];
                if(!prev.includes(curr)){
                    prev.push(curr);
                }
            }
            return prev;
        }
        return;
    }
    callNavigator(list,elementKey){
        this.props.addNav(list,elementKey);
    }
    createList(list,key){
        var filteredList = this.getSiblings(list,key);
        if(typeof filteredList !== 'undefined'){
            //elementKey = key within data that you want to display (i.e. keyword_names)
            console.log(filteredList);
            return filteredList.map(function(value,i){
                return <NavigatorItem key={i} elementKey={key} value={value} list={list}
                                                                            navigatorCall={this.callNavigator.bind(this)}/> }.bind(this));
        } else {
            return;
        }

    }

    render() {
        return (
            <div className="NavigatorList">
                <ul>
                {this.createList.bind(this, this.props.list,this.props.elementKey)()}
                </ul>
                <div className="arrow-down left"></div>
            </div>
        );
    }
}

export default NavigatorList;