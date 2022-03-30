import React from 'react';
import axios from 'axios';

class ListComponent extends React.Component{ 
  constructor(props) {
    super(props);
    this.state = { 
      
      text1: "",
      text2: "",
      text3: "",
      text4: "",
      //text1 : this.props.text1,
      //text2 : this.props.text2,
    
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value

    });
  }

  handleSubmit(event){

    console.log("text1:"+ this.state.text1)
    console.log("text2:"+ this.state.text2)

    axios.post('http://localhost:8000/wel/',
      {
        text: this.state.text1
      }
      
      )
      .then( res =>{
        console.log(res); 
      })
      .catch(err => {})

    event.preventDefault();
  }

  render() {
    
    //console.log('props', this.props)
    return ( 
    
      <div className="EntryComponent"> 

        <form onSubmit={this.handleSubmit} className='form row'>
          <input name="text1" type="text" value={this.state.text1} onChange={this.handleChange} className="col left-input" />
          <input name="text2" type="text" value={this.state.text2} onChange={this.handleChange} className="col"/>
          <input name="text3" type="text" value={this.state.text3} onChange={this.handleChange} className="col"/>
          <input name="text4" type="text" value={this.state.text4} onChange={this.handleChange} className="col"/>
  
          <div className="col">
            <input type="submit" value="Save" />
        
          </div>

        </form>

          <button onClick={() => this.props.onDelete(this.props.id, this.props.type)}>Delete</button>
      </div> 
    );

  }
  
}; 

export default ListComponent;  