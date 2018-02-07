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
        this.handleMenuClick = this.handleMenuClick.bind(this);
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

    handleMenuClick(menuItem){
        var menuObject = {
            name:menuItem.name,
            pdf:menuItem.pdf
        };
        this.props.sendData(menuObject);
        this.menuToggle();
    }

    //TODO: create clickHandler for menu item click
    render() {
        return (
            <div className="Heading grid-x grid-padding-x">
                <div className="Search medium-3 cell">
                    <form className="grid-x">
                        <img className="medium-1 cell search-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM+SURBVGhD7ZlNSFRRFMeFPqAvoqB9ZVEtIqJFBQWtsogiA2kbtYoCcxvRSoIgaFHUKlpIiwyMsnbRkAw6jeM4iYRYEK3Sgpq+rMCy34lzH6caHXXunQ95f/hz35xz7znn/z7uve9NXYwYcwSpVGpNb29vC2yDj+HzTCaTpe2kvd7X13ckl8st0e7VB4pspFiazMQ0+E2EimgdXnlQ1EaYNEVOm4j5QXtxcHBwoYarDCiiAeZdYYZZ2AqPpdPp/bSHKfo07Q3at7R/9cfWlc1mV2nY8oICmuC4KeYX7R0K36BdCqK9vX2ejKX/CzdWxw+XXQwP7DYSfzVFvKdtUPe0kEgk5jPmiouhcZ6U7TYj4WISvjbJR4tdhalAjDMulsa7pK6wINE5k1Qe1h3qmjWIc9XE/B58Nuvu7l5Jso8uKTyvrpJAnAUIeOnictymrjAgwQmXDI5wPy9VV8nguTtqYo8FXTQRct8l49jrvSyzGTHfGTGN6vIPgo+ZRLvV7A0Iuenic3xNzX4hc7wRMcHzskhd3kDxsmg6IZ1q9guEbDFC8mr2CtlQGiEZNfsFgbcbISNq9gqE7DM5htTsFwipd0k4/ikrs7q8gYX1uMnxSM1+Ic+ECHCJuNXWq8sbiH/BCAm3lpAg7RLBZjV7A8U/Cxk/AsFla+7OWI+avYDnY5OLLezv71+tLv8g2TqS2K37AXWVDGJ1mLhhZiwLktx2CeEQXK6uWUNOiIk5wQk7qK5wYGZZS+LPLinHD2R7oe4Zgxjyqhy9ZRKvS13hQbKTLrHyIZzxlWHMLmKNmjj5ELNhQcgbHMnvmuR/iG2Yq3VIu02JZDK5jDGtjJH3GRdjnN97tUtYTCbCEn8PbJEzaxdN2ZZj3wMvQ7vLlTFfaJu0a1gUEqG/T2khkd0Ru3yQeAM/WbslfV5xJbdqmrCYTITYxc9xPZTZLJqai5H+H2jPhthFF0QxERa6zsii+RT+J4px8uXlnuypBgYGVuiw8JiJiH8hZ1o+IiBuJ2M2y/uMusqLUkRUDWIR1YJYRLVgLomI3gViEZXCJCI6akqEgKKjr3o1K0KgH41v1bQIB/0/r7mmRcSIESNGFaKu7jdS7lZSNjkuXgAAAABJRU5ErkJggg==" alt="Search Icon"/>
                        <input className="medium-10 cell" type="text"/>
                    </form>
                </div>
                <div className="medium-offset-4 medium-5 large-offset-5 large-3 cell">
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
                                return <li key={i} className="menu-item" onClick={(e)=>{e.preventDefault();this.handleMenuClick(menuItem)}}>{menuItem.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Heading;