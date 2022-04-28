import React from 'react';

class Dateinput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: "",
            today: "",
        };
        
        this.getToday= this.getToday.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(event){
        
        const target = event.target; 
        var value = target.value;  
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    //get today, alot of formatting stuff...
    getToday(){
        const current = new Date();

        var year = current.getFullYear().toString()
        var month = (current.getMonth()+1).toString()
        var day = current.getDate().toString()  
        
        //formatting stuff
        if (month.length <2) {
            month = '0'+month;
        }
        if (day.length <2) {
            day = '0'+day;;
        }

        let date = [year, month, day].join('-')
  
        if (this.state.date !== date){ //
            this.setState({
                date: date,
                today: date,
            });
        }
    }
    
    componentDidMount() {
        this.getToday(); /// gör så att date pickern har idag. 
    }
   
    
 render(){ 
    
    return (
        <div className='container Date-div-parent'>
            <div className='row'>
                <div className='col calendar'>
                    {/* onChange feed data into state, onSelect feed data to parent APP */}
                    <input 
                        className=''
                        type="date" 
                        id= "calendar"
                        onChange={this.handleChange}      
                        onSelect ={() => this.props.onDate(this.state.date) }
                        value={this.state.date}
                        name="date"
                    />
                </div>
            </div>
            <div className='row'>
                <div id="dateheader">
                    <h1 className='Date-head text-center'> 
                        {/* check if today then display Today in DOM, otherwise "this,state "*/}
                        {this.state.date === this.state.today ? 
                            "Today" : this.state.date} 
                    </h1>
                </div>
            </div>
        </div>
        ); 
    }
}


export default Dateinput;

