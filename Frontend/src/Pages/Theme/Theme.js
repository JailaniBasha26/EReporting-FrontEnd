import React, { Component } from "react";
import './Theme.css'
import { Dropdown } from 'primereact/dropdown';


class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  colors = [
    {name:'Psychedelic'},
    {name:'Hot Pink'},
    {name:'Black'},
    {name:'Purple'},
    {name:'Yellow'},
  ]


  ColorSwitch(e) {
    
    let choice = e.value.name;
    console.log(e.value.name);
    if(choice == 'Hot Pink') {
        this.update('hotpink','lime');
    } else if(choice == 'Black') {
        this.update('black','white');
    } else if(choice == 'Purple') {
        this.update('purple','white');
    } else if(choice == 'Yellow') {
        this.update('yellow','red');
    } else {
        this.update('purple','yellow');
    } 

}

 update(bgColor, textColor) {
    console.log("Hi"); 
    console.log(bgColor, textColor); 
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    document.input.style.backgroundColor = bgColor;
    document.input.style.color = textColor;
}
  render() {
    return(
        <div>
            <div class="wrapper">
		    <div class="header">
			<label for="theme">Select Theme Option: </label>
            <Dropdown 
                //value={selectedCity} 
                onChange={(e) => this.ColorSwitch(e)} 
                options={this.colors} 
                optionLabel="name" 
                placeholder="Select a Theme" 
                className="w-full md:w-14rem" 
            />
            </div>

            <div class="content">
            <h1>WHEN is it considered NICE,<br></br>to pull a<br></br>Switch-A-Roo?</h1>
            </div>
            </div>		
  	    </div>
    ) 
  }
}
export default Theme;
