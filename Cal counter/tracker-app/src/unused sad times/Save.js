import React from 'react';
import axios from 'axios';

class Save extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.handleInfo=this.handleInfo.bind(this);
    
    }

    handleInfo = (e, info) => {
        console.log(info[0])

        axios.post('http://localhost:8000/entry/',
        {
            //user
            //food: info[0].name,
            //food: "Spinach",
            //qty: Number(info[0].qty),
            //date
        })
        .then( res =>{
            console.log(res); 
        })
        .catch(err => {})
    
    }
        
        
 render(){ 
    

    return (
        <div className='row'>
            <div className='save-but'>

                <button onClick={((e) => this.handleInfo(e, this.props.info))}   
                > 
                    Save
                </button>
               
            </div>
        </div>
    );
            
    }
}


export default Save;

