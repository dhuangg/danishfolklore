/**
 * Created by danielhuang on 3/3/18.
 */
import React, { Component } from 'react';
import {getKeywords, arrayTransformation} from './model';
import Fuse from 'fuse.js';
import './search.css';

class SearchComponent extends Component {

    constructor(){
        super();
        this.data = getKeywords();
        this.state = {
            keywords:[],
            results:this.data.slice(0,100),
            searching:false,
        };
        this.fuse = new Fuse(this.data, {
            shouldSort: true,
            threshold: .2,
            location: 0,
            distance: 1000,
            maxPatternLength: 64,
            minMatchCharLength: 1,
            keys:[
                "keyword_name"
            ]
        });
    }

    componentWillMount(){
        this.setState({
            keywords:getKeywords(),
            results:getKeywords()
        });

    }

    handleSearch(selectedItem){
        //console.log(selectedItem);
        var storiesList = [];
        var placesList = [];
        if(typeof selectedItem['stories']['story'] !== 'undefined'){
            storiesList = arrayTransformation(selectedItem['stories']['story']);
        }
        if(typeof selectedItem['places']['place'] !== 'undefined'){
            placesList = arrayTransformation(selectedItem['places']['place']);
        }
        var itemsList = storiesList.concat(placesList);
        //console.log(itemsList);
        this.props.handleDisplayItems(storiesList,'Stories');
        this.setState({searching:false, searchTerm:selectedItem['keyword_name']});
    }

    handleFuzzySearch(){
        var input = this.refs.searchString.value;
        console.log(this.fuse);
        if (input === '') {
            this.setState({
                results: this.data.slice(0, 100),
                searchTerm:input,
            });
        }
        else {
            const results = this.fuse.search(input);
            this.setState({
                results: results,
                searchTerm:input,
            });
        }
    }

    renderKeywords(){
        if(typeof this.state.keywords !== 'undefined'){
            return this.state.keywords;
        }
    }

    renderSuggestions(){
        if(typeof this.state.results !== 'undefined'){
            return this.state.results.map((keyword,i)=>{
                return <li key={i} style={{cursor:'pointer'}}
                           onClick={(e)=>{e.preventDefault();this.handleSearch.bind(this)(keyword)}}>{keyword['keyword_name']}</li>
            });
        }
    }

    render() {
        return (
            <div className="SearchComponent grid-x grid-padding-x">
                <form className="cell">
                    <input type="text" ref="searchString" placeholder="Search Term" value={this.state.searchTerm}
                           onClick={(e)=>{
                               e.preventDefault();
                               //reset results column
                               this.props.handleDisplayItems([],'Stories');
                               this.setState({searching:true});
                           }}
                           onChange={this.handleFuzzySearch.bind(this)}/>
                </form>
                <ul className={`suggestions ${this.state.searching ? 'active' : ''}`}>
                    {this.renderSuggestions.bind(this)()}
                </ul>
            </div>
        );
    }
}

export default SearchComponent;