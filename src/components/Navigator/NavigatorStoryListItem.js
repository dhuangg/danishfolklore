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
        //6) if item is selected, pass to the TabViewer to decide which view to display for the new tab
        this.props.getStoryData(this.props.story.story_id, this.props.story.full_name);
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