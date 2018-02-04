/**
 * Created by danielhuang on 1/31/18.
 */
import React, { Component } from 'react';

class AssociatedStoriesViewer extends Component {

    constructor(){
        super();
        this.state = {
        };
    }

    render() {
        return (
            <div className="AssociatedStoriesViewer grid-x">
                <h4>Associate Stories</h4>
                <div className="stories-container">
                    <ul className="book">
                        {this.props.storyList}
                    </ul>
                </div>
            </div>
        );
    }
}

export default AssociatedStoriesViewer;