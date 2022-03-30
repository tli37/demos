import React from 'react';

const TestButton = (props) => {


    return (

        <div> 
    
            <button className="AddButton" onClick={props.onClick} > 
                {props.text} 
            </button>

            <div>
        
            </div>

        </div>
       
    )
}

export {TestButton};