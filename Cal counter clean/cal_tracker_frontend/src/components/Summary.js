import React from 'react';

class Summary extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    
    }      
 render(){ 

    const kcalsum = 
        (this.props.breakfast.reduce((prev, cur) => prev+ Number(cur.kcal), 0) +
        this.props.lunch.reduce((prev, cur) => prev+ Number(cur.kcal), 0) +
        this.props.dinner.reduce((prev, cur) => prev+ Number(cur.kcal), 0) +
        this.props.snacks.reduce((prev, cur) => prev+ Number(cur.kcal), 0)).toFixed(1)

    const proteinsum = 
        (this.props.breakfast.reduce((prev, cur) => prev+ Number(cur.protein), 0) +
        this.props.lunch.reduce((prev, cur) => prev+ Number(cur.protein), 0) +
        this.props.dinner.reduce((prev, cur) => prev+ Number(cur.protein), 0) +
        this.props.snacks.reduce((prev, cur) => prev+ Number(cur.protein), 0)).toFixed(1)

    const carbsum = 
        (this.props.breakfast.reduce((prev, cur) => prev+ Number(cur.carbs), 0) +
        this.props.lunch.reduce((prev, cur) => prev+ Number(cur.carbs), 0) +
        this.props.dinner.reduce((prev, cur) => prev+ Number(cur.carbs), 0) +
        this.props.snacks.reduce((prev, cur) => prev+ Number(cur.carbs), 0)).toFixed(1)
    
    const fatsum =
        (this.props.breakfast.reduce((prev, cur) => prev+ Number(cur.fat), 0) +
        this.props.lunch.reduce((prev, cur) => prev+ Number(cur.fat), 0) +
        this.props.dinner.reduce((prev, cur) => prev+ Number(cur.fat), 0) +
        this.props.snacks.reduce((prev, cur) => prev+ Number(cur.fat), 0)).toFixed(1)

    return (

        <div>
            <div> 
            <h2> Daily Summary </h2>
           <div className = "row Summarylist">
              <div className = "col">  </div>
              <div className = "col"> kcals </div>
              <div className = "col" > carbs </div>
              <div className = "col" > protein </div>
              <div className = "col" > fat </div>
              <div className = "col" > </div>
              <div className = "col" > </div>
            </div>
        </div>
        <div className='row Summarylist'>
            <div className='col'> </div>
            <div className='col'> {kcalsum} </div>
            <div className='col'> {carbsum}</div> 
            <div className='col'> {proteinsum}</div> 
            <div className='col'> {fatsum} </div> 
            <div className='col'> </div> 
            <div className='col'> </div> 
        </div>
        </div> 
    );
            
    }
}


export default Summary;

