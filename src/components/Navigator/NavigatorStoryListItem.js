/**
 * Created by danielhuang on 1/18/18.
 */
import React, { Component } from 'react';
import NavigatorItem from './NavigatorItem'

//creates list of clickable items based on a given list and key (i.e. type/name/etc.)
class NavigatorStoryListItem extends Component {
    constructor(){
        super();
    }

    render() {
        return (
            <li className="NavigatorStoryListItem">
                {this.props.story.full_name}
            </li>
        );
    }
}

export default NavigatorStoryListItem;