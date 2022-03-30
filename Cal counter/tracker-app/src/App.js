import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Button} from './Addbutton.js';
import Chartsummary from './Chart.js'
import Dateinput from './Date.js';
import {EntryHeader} from './Entryheader';
import Login from './Login';
import Meallist from './Meallist';
import React from 'react';
import Search from './Search.js'
import axios from 'axios';
import Summary from './Summary';


class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      breakfast: [],
      lunch: [],
      dinner: [],
      snacks: [],
      chartdata: [],
      plotted: false,
      selection: [],
      searchinput: [],
      summary: [],
      date: "",
      
    };
    
    this.dateHandler = this.dateHandler.bind(this);
    this.handleChart = this.handleChart.bind(this);
    this.addEntry = this.addEntry.bind(this);

  }

  //gets info from Search module through props 
  //set state, post to backend. after recieve entry ids so u can edit and delete those if neccesary
  addEntry = (select, qty, type) => { 

    //just check if inputs are empty
    if (qty === "" || qty === "0" || select.name === null){
      return
    }
    else {

      var selection =  { //change the end ammounts depending on quantity
        ...select,
        kcal: select.kcal * qty / 100,
        carbs: select.carbs * qty / 100,
        protein: select.protein * qty / 100,
        fat: select.fat * qty / 100,
        qty: qty
      };

      this.setState({
        selection: selection
      }) 

      //send to backend
      axios.post('http://localhost:8000/entry/', {
        
        user: localStorage.getItem('id'),
        food: selection.name,
        qty: Number(selection.qty),
        date: this.state.date,
        type: type,
    
      })
      .then( res =>{ 
        //after sending it to backend, return with the unique entryid. 
        //so we can edit and delete
        console.log(res)
        let data= res.data

        selection= {...selection,
          entryid: data.entryid 
        }
 
        this.setState({
          [type] : [...this.state[type], selection]
        })

        this.handleChart();
      })
    }
  }

  //confirmation window
  //throw out the value of the state data
  //insert new state and then send to backend
  handleDelete = (id, type, entryid) => {

    if (window.confirm("Are you sure you want to delete this entry?")){
      console.log("hehe true ")
    }else{
      console.log("false")
    }
    
    //get state that is going to be changed
    var changer = this.state[type];

    if (id > -1) {
      changer.splice(id, 1);
    }

    //set new state
    this.setState({type: changer});

    axios.delete('http://localhost:8000/entry/', {
      data: { entryid: entryid }
      })
      .then( res =>{
        console.log(res)
        setTimeout(() => { this.handleSelect();}, 500)
      })
  }

  //first stage of edit, show and hide right elements. 
  //Input qty from state into the dom
  handleEdit1 = (id, type) => {

    let qtyid = document.getElementById(`qty${type}${id}`) //quantity id
    let eid = document.getElementById(`e${type}${id}`) //edit id
    let eform = document.getElementById(`eform${type}${id}`) //form id
    
    qtyid.className="hidden";
    eform.className="";

    eid.value=this.state[type][id].qty; //get and set the edit id to same value as current state
   
  }

  //2nd stage of edit. Get info from DOM, 
  //copy stuff from current state, insert new value into those arrays
  //Update state and send to backend
  handleEdit2 = (id, type, entryid) => {

    let qtyid = document.getElementById(`qty${type}${id}`) //quantity id
    let eid = document.getElementById(`e${type}${id}`) //edit id
    let eform = document.getElementById(`eform${type}${id}`) //form id

    let changer = [...this.state[type]];//get certain type
    let change = {...changer[id]}; //get at certain ID

    change.qty = eid.value; //get value from DOM , put the "qty" value to the DOM value
    
    changer[id] = change; //put back into array

    //set state
    this.setState({ 
      [type]: changer
    })
    
    qtyid.className="";
    eform.className="hidden";
    console.log(entryid)

    // send updated info to backend  
    if (isNaN(eid.value) === false) {
      
      axios.put('http://localhost:8000/entry/', {
        entryid: entryid,
        qty: eid.value
      })
      .then( res =>{
        console.log(res)
        setTimeout(() => { this.handleSelect();}, 500)
        
      })
    }
  }
  
  //this function called if select is happening in the Date module.
  //gets data from backend and then will call on the chart update
  dateHandler = (date) => {

    //check if same, null or undefined
    if (date !== this.state.date && date !== null){
      if (date !== undefined) {
        this.setState({
          date: date
        })
      }
    }
    
    let data; 
    var user = localStorage.getItem('user');
    
    if (date === null || date === undefined){
    }
    else {

      axios.get('http://localhost:8000/entry/', {
          params: {
            date: date,
            user: user
          }
        })
        .then( res =>{
          data = res.data;
          console.log(res)

          this.setState({

              breakfast: data.breakfast,
              lunch: data.lunch,
              dinner: data.dinner,
              snacks: data.snacks

            });

          //load chart when reciving new data and updating state
          setTimeout(() => { this.handleChart();}, 250)
        }        
        )
        .catch(err => {})
    }
    
  }
  
  // auto run a select because the child component is onclick 
  // and i dont know how to do it more efficent
  handleSelect(){ 
    var ele = document.getElementById("calendar");
    var counter = 0;
    var i = setInterval(() => {

      ele.select();
      ele.click();
      counter ++;

      // exit if fetched date
      if (counter === 5 || this.state.date !== "" ){
        clearInterval(i);
        console.log(counter)
        console.log("Select cleared")
      }
      
    }, 750);
    
  }
  

  //update chart. get data from state,
  //running 3 times cuz sometimes it doesnt get the data
  handleChart(){

    var counter = 0;

    var i = setInterval(() => {
      
      // sum of info the this state, (if there is no data the IF statement should return 0)
      const breakfastsum = this.state.breakfast.reduce((prev, cur) => prev+ Number(cur.kcal), 0)
      const lunchsum = this.state.lunch.reduce((prev, cur) => prev+ Number(cur.kcal), 0)
      const dinnersum = this.state.dinner.reduce((prev, cur) => prev+ Number(cur.kcal), 0)
      const snacksum = this.state.snacks.reduce((prev, cur) => prev+ Number(cur.kcal), 0)
      
      // numbers to plot or zero
      if ((breakfastsum + lunchsum + dinnersum + snacksum) >= 0){
        const chartdata = [
          {name: "Breakfast", value: breakfastsum }, 
          {name: "Lunch", value: lunchsum }, 
          {name: "Dinner", value: dinnersum }, 
          {name: "Snacks", value: snacksum }, 
        ]

        this.setState({
          chartdata: chartdata,
          plotted: true
        })

      }

      // loop exiters
      counter ++;

      if (counter === 3 || this.state.plotted=== true ){
        clearInterval(i);
        console.log(counter)
        console.log("plotted cleared")
      }
      
    }, 1000);    
    
  }

  componentDidMount(){
    
    // first click select, then the calendar has onclick that vill fetch data
    setTimeout(() => { this.handleSelect();}, 800)
    
  }
  
  render(){

    return (
      
        <div id="App-div" className='container'> 
          <Login />
          <br></br>

          <Dateinput onDate={this.dateHandler} />

          <Search selection = {this.addEntry}></Search>

          <Chartsummary data={this.state.chartdata}/>


          {/* 4 meal entries + summary below */ }
          <div id="bfast" className='MealHeader Breakfast' >
            <EntryHeader text="Breakfast"/> 
            {this.state.breakfast.map((item, index) => (
              <Meallist key={index} meal={item}
                type="breakfast"
                id={index}
                onDelete = {this.handleDelete}
                onEdit = {this.handleEdit1}
                onEdit2 = {this.handleEdit2}
              > </Meallist>
             ))}   
          </div>
          
          <div id="lunch" className='MealHeader Lunch'>
            <EntryHeader text="Lunch"/> 
            {this.state.lunch.map((item, index) => (
              <Meallist key={index} meal={item}
                type="lunch"
                id={index}
                onDelete = {this.handleDelete}
                onEdit = {this.handleEdit1}
                onEdit2 = {this.handleEdit2}
              > </Meallist>
            ))}
          </div>

          <div id="dinner" className='MealHeader Dinner'>
            <EntryHeader text="Dinner"/> 
            {this.state.dinner.map((item, index) => (
              <Meallist key={index} meal={item}
                type="dinner"
                id={index}
                onDelete = {this.handleDelete}
                onEdit = {this.handleEdit1}
                onEdit2 = {this.handleEdit2}
              > </Meallist>
            ))}
          </div>

          <div id="snacks" className='MealHeader Snacks'>
            <EntryHeader text="Snacks"/> 
            {this.state.snacks.map((item, index) => (
              <Meallist key={index} meal={item}
                type="snacks"
                id={index}
                onDelete = {this.handleDelete}
                onEdit = {this.handleEdit1}
                onEdit2 = {this.handleEdit2}
              > </Meallist>
            ))}
          </div>    

          <div id="summary" className='Summary'>
            <Summary text="Snacks" 
            breakfast={this.state.breakfast}
            lunch={this.state.lunch}
            dinner={this.state.dinner}
            snacks={this.state.snacks}
            > </Summary>

          </div>
        </div> 
      
    );
  }
  
}

export default App;
