/**
 * Created by danielhuang on 1/18/18.
 */
import React, { Component } from 'react';

//creates list of clickable items based on a given list and key (i.e. type/name/etc.)
class NavigatorStoryListItem extends Component {
    constructor(){
        super();
        this.handleStoryClick = this.handleStoryClick.bind(this)
    }
    handleStoryClick(e){
        this.props.getStoryData(this.props.story.story_id)
    }
    //
    render() {
        return (
            <li className="NavigatorStoryListItem" onClick={this.handleStoryClick}>
                {this.props.story.full_name}
            </li>
        );
    }
}

export default NavigatorStoryListItem;