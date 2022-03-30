import React from 'react';
import axios from 'axios';

class TestSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            selection: [{carbs: "0.0", entryid: 61, fat:"0.4", kcal:"19.7", name:"Chicken Breast",
            protein :"3.7", qty:"12"
                }]

        };
        this.handleClick.bind(this);
       
    }

    handleClick = () => {
        this.props.testpath(this.state.selection);
    }

    render(){
        return(
            <div>
               <button onClick={this.handleClick}>Reveal Title</button>
            </div>
        )
        
     
    };
}

export default TestSearch;
