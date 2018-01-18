/**
 * Created by danielhuang on 1/14/18.
 */
import React, { Component } from 'react';
import {getChildren} from '../../utils'


class NavigatorItem extends Component {
    constructor(){
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.handleHover = this.handleHover.bind(this);
    }
    clickHandler(e){
        e.preventDefault();
        var childrenList = getChildren(this.props.list,this.props.elementKey,this.props.value);
        //if there are children search elements, tell Navigator to display them
        if(childrenList.length !== 0){
            this.props.navigatorCall(childrenList,this.props.elementKey);
        }
        //else if it is a data navigator or topic & index navigator
        if(this.props.value==='Data Navigator' || this.props.value==='Topic & Index Navigator'){
            this.props.navigatorCall(this.props.value);
        }
        //else display associated stories
    }
    //event handlers to change where the arrow-downs are positioned
    handleHover(item){
        //this.props.navigatorCall(this.props.value);
    }
    render() {
        return (
            <li className="NavigatorItem" onClick={this.clickHandler}  onMouseEnter={this.handleHover(this.props.value)}>
                {this.props.value}
            </li>
        );
    }
}

export default NavigatorItem;