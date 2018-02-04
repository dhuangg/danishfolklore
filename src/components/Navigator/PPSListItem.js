/**
 * Created by danielhuang on 1/18/18.
 */
import React, { Component } from 'react';
import classNames from 'classnames';

//creates list of clickable items based on a given list and key (i.e. type/name/etc.)
class PPSListItem extends Component {
    constructor(){
        super();
        this.handlePPSClick = this.handlePPSClick.bind(this);
    }
    handlePPSClick(e){
        e.preventDefault();
        var itemID = this.props.itemObj[this.props.idKey];
        var name = this.props.itemObj[this.props.nameKey];
        var type = this.props.type;
        this.props.getPPS(itemID, name, type);
    }

    render() {
        var PPSListItemClasses = classNames('PPSListItem',this.props.type);
        return (
            <li className={PPSListItemClasses} onClick={this.handlePPSClick}>
                {this.props.itemObj[this.props.nameKey]}
            </li>
        );
    }
}

export default PPSListItem;