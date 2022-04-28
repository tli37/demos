import React from 'react';

class Meallist extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    
    }

 //mapping states in APP through props
 //so abit of template,  abit of hidden edit forms etc           
 render(){ 
    return (
        <div className='row Meallist'>
            <div className='col'> {this.props.meal.name} </div>
            <div className='col'> {this.props.meal.kcal} </div>
            <div className='col'> {this.props.meal.carbs} </div> 
            <div className='col'> {this.props.meal.protein} </div> 
            <div className='col'> {this.props.meal.fat} </div> 
            <div className='col'> 
                {/* this will put a unique type+id in the div , show qty in*/}
                <div id={"qty"+this.props.type+this.props.id}> {this.props.meal.qty} </div>
                {/* hidden edit form, mark it unique entry ids */}
                <form id={"eform"+this.props.type+this.props.id} className='hidden'> 
                    <input className='e-input'
                        id={"e"+this.props.type+this.props.id} />
                    {/* do edit step 2, aka submit */}
                    <button type="button" className='edit-button'
                        onClick={() => this.props.onEdit2(
                        this.props.id, this.props.type, this.props.meal.entryid )} > 
                        Submit
                    </button>
                </form>
            </div> 
            <div className='col'> 
                {/* Delete button */}
                <button className='edit-button'
                    onClick={() => this.props.onDelete(
                    this.props.id, this.props.type, this.props.meal.entryid
                    )}>   
                Delete
                </button>
                {/*Edit step 1, show and hide edit elements */}
                <button className='edit-button'
                    onClick={() => this.props.onEdit(
                    this.props.id, this.props.type
                )}>   
                Edit
                </button>
            </div>
        </div>
    );
            
    }
}


export default Meallist;

