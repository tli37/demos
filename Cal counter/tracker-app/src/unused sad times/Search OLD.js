import React from 'react';
import axios from 'axios';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            foods: [],
            searchterm: "",
            showbox: "",
            fail: false,
            select: [],
            qty:0,
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        
        var target = event.target; 
        var value = target.value;  
        var name = target.name;

        if (name ==="qty"){
            if( value < 0) {
                value = 0;
            }
        }

        this.setState({ //reset fail
            [name]: value,
            fail : false,
        });

        //show searchbox if there is a match
        if (name === "searchterm") {

            var show = false ;

            this.state.foods.filter(data => {
               
                if(data.name.toLowerCase().includes(value.toLowerCase())){
                    show = true;
                }
                if( value === "" ){ //cant do else if cuz it hits weird in the if statement
                    show = false
                }
            })
            
            this.setState({
                showbox: show
            })
           
        }
    }

    handleFocus(event){ //selecting whole input when clicking in the search field
        event.target.select();
    }

    handleSubmit(event){ //if u submitt a searchword into the search bar
        
        event.preventDefault();
 
        if(this.state.searchterm === ""){
            this.setState({
                fail: true
            })
        }
        
        //search in fooddata base and confirm
        this.state.foods.filter( data => {
            if(data.name.toLowerCase() === this.state.searchterm.toLowerCase()){
                this.setState({
                    select: data
                });
            }
        })
    }

    handleChoice(event){
        const target = event.target;
        //const attri = target.attributes; 
        const value = target.attributes.value.value;
        
        this.setState({
            searchterm: value,
            showbox: false,
        });
    
        setTimeout(() => {  this.handleSubmit(event); }, 10);
        
    }

    componentDidMount(){
        let data; 

        axios.get('http://localhost:8000/foods/')
        .then( res =>{
        data = res.data;
        this.setState({
            foods: data
            });
        })
        .catch(err => {})
    }

    render(){
        const select1 = this.state.select.kcal;
        //const prop= this.props;
        //console.log(this.state.select)
        //console.log(this.state.foods)
        return(
           
            <div >
                <div className='search-div row'>
                    <form onSubmit={this.handleSubmit} className='d-flex justify-content-center' > 
                        <input id="searchbar" 
                            type="text"
                            className='d-flex justify-content-center'
                           
                            name="searchterm" 
                            placeholder="search for foods"  
                            value={this.state.searchterm}
                            onChange={this.handleChange} 
                            onFocus={this.handleFocus}
                            autoComplete="off"
                        />
                        <input type="submit" value="enter"/>
                    </form>
                    {this.state.fail === true ? 
                        <div>
                            <p> no input, try again</p>
                        </div>
                    : null
                    }
                   
               
                    
                
                    {/* found this in a utube video, https://www.youtube.com/watch?v=mZvKPtH9Fzo&ab_channel=PedroTech  */}
                    {/* basically filter for the search bar */}
                    
                    <div className='row position-relative justify-content-md-center'> 
                        
                        {this.state.showbox === true ? //show this element if its not empty (without=ugly outline box if empty)

                            <div className='foodfilter-parent position-absolute top-0 end-51
                                col-2' >
                                {/* original filter */}
                                {this.state.foods.filter(data => {
                                    
                                    if(this.state.searchterm === "" ){ // empty
                                        return ""
                                    }
                                    else if(data.name.toLowerCase().includes(this.state.searchterm.toLowerCase())){
                                        return data
                                    }
                                    else{
                                        return ""
                                    }
                                }).slice(0, 5).map((data, index) => ( //slice limits max entries
                                    <div className="foodfilter-child" key={index}>
                                        <p onClick={this.handleChoice} name={data.name} value={data.name}>{data.name}</p>
                                    </div>  
                                    ))
                                }  
                            </div>  

                        : null }

                    </div>
                    
                </div>
                
                <div id="fooddata" className='row position-relative MealHeader' hidden={false}>
                    <h1 id="foodname" data-info={this.state.select.name}> {this.state.select.name} </h1>
                    <div className='row fooddata-h1 fooddata-divs'>
                        <div className='col'> </div>
                        <div className='col'>kcal </div>
                        <div className='col'>carbs </div> 
                        <div className='col'>protein </div> 
                        <div className='col'>fat </div> 
                        <div className='col'>qty (grams)</div>  
                    </div>
                    <div className='row fooddata-divs' >
                        <div className='col-md-auto fooddata-h1'> Nutritional Value / 100g</div>
                        <div id="start-kcal" className='col'>{this.state.select.kcal}  </div>  
                        <div id="start-carbs" className='col'> {this.state.select.carbs} </div>
                        <div id="start-protein" className='col'> {this.state.select.protein} </div>
                        <div id="start-fat" className='col'> {this.state.select.fat} </div>
                        <div id="start-qty" className='col'>    </div>
                    </div>
                    <div className='row fooddata-divs' >
                        <div className='col fooddata-h1'> Your Meal</div>
                        <div id="kcal" className='col' data-info= {select1 ? ((this.state.select.kcal * this.state.qty / 100).toFixed(1)) : ("")} > 
                            {select1 ? ((this.state.select.kcal * this.state.qty / 100).toFixed(1)) : ("")} </div>  
                        <div id="carbs" className='col' data-info= {select1 ? ((this.state.select.carbs * this.state.qty / 100).toFixed(1)) : ("")}> 
                            {select1 ? ((this.state.select.carbs * this.state.qty / 100).toFixed(1)) : ("")} </div>
                        <div id="protein" className='col' data-info= {select1 ? ((this.state.select.protein * this.state.qty / 100).toFixed(1)) : ("")} > 
                            {select1 ? ((this.state.select.protein * this.state.qty / 100).toFixed(1)) : ("")} </div>
                        <div id="fat" className='col' data-info= {select1 ? ((this.state.select.fat * this.state.qty / 100).toFixed(1)) : ("")} >
                            {select1 ? ((this.state.select.fat * this.state.qty / 100).toFixed(1)) : ("")} </div>
                        <div id="qty" className='col' data-info= {this.state.qty}> 
                        
                            <input id="qty-input"name="qty" type="number" onChange={this.handleChange}
                                min="0" placeholder="g" className='input-sm qty-in' />
                        </div>
                    </div>
 
                </div> 
            
            </div>
            
        );
    }
}

export default Search;
