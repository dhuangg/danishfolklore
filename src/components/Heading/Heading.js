/**
 * Created by danielhuang on 1/28/18.
 */
import React, { Component } from 'react';
import './Heading.css'

class Heading extends Component {

    constructor(){
        super();
        this.state = {
            storyPath:'',
            menuActive:false,
            menuList:[]
        };
        this.menuToggle = this.menuToggle.bind(this);
    }

    componentWillMount(){
        this.setState(()=>{
           var MenuList = [
               {name:'Preface',pdf:'',submenu:[]},
               {name:'Acknowledgements',pdf:'',submenu:[]},
               {name:'1. Introduction',pdf:'',submenu:[]},
               {name:'2. The Rise of Folklore Scholarship',pdf:'',submenu:[]},
               {name: "3. Evald Tang Kristensen's Life and Work",pdf:'',submenu:[]},
               {name:'4. Folklore Genres',pdf:'',submenu:[]},
               {name:'5. Mapping Folklore',pdf:'',submenu:[]},
               {name:'6. Repertoire and the Individual',pdf:'',submenu:[]},
               {name:"7. 'Bitte Jens' Kristensen: Cobbled Together",pdf:'',submenu:[]},
               {name:'8. Kristen Marie Pedersdatter: Between Farms and Smallholding',pdf:'',submenu:[]},
               {name:'9. Jens Peter Peterson: Day Laborer and Turner',pdf:'',submenu:[]},
               {name:'10. Ane Margrete Jensdatter: Old Age and Rural Poverty',pdf:'',submenu:[]},
               {name:'11. Peder Johansen: Miller, Fiddler, Bachelor Storyteller',pdf:'',submenu:[]},
               {name:'Additional Information',pdf:'',submenu:[]},
               {name:'About',pdf:'',submenu:''},
           ];
           return {menuList:MenuList};
        });
    }

    menuToggle(){
        this.setState((prevState)=>{
           return {menuActive:!prevState.menuActive}
        });
    }
    //TODO: create clickHandler for menu item click
    render() {
        return (
            <div className="Heading grid-x grid-padding-x">
                <div className="medium-2 cell">Search</div>
                <div className="medium-offset-5 medium-5 large-offset-6 large-3 cell">
                    <div className="grid-x grid-margin-x">
                        <img src={require('./assets/DENM0001.png')} className="flag medium-3 cell" alt="Danish Flag"/>
                        <h5 className="danish-folklore medium-3 cell">Danish Folklore</h5>
                        <h6 className="etk medium-6 cell">The Evald Tang <br/> Kristensen Collection</h6>
                    </div>
                </div>
                <div className="Hamburger-Menu medium-1 cell" onClick={this.menuToggle}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={`Menu ${this.state.menuActive ? 'active' : ''}`}>
                    <div className="solid">
                        <div className="Hamburger-Menu" onClick={this.menuToggle}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <ul className="list">
                            {this.state.menuList.map((menuItem,i)=>{
                                return <li key={i} className="menu-item">{menuItem.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Heading;