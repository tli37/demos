import React from 'react';

const EntryHeader = (props) => {
    // just format/template
    return (
        <div> 
            <h2>{props.text} </h2>
           <div className = "row Entryheader">
              <div className = "col"> Food </div>
              <div className = "col"> kcals </div>
              <div className = "col" > carbs </div>
              <div className = "col" > protein </div>
              <div className = "col" > fat </div>
              <div className = "col" > qty(grams)</div>
              <div className = "col" > </div>
            </div>
        </div>
    )
}

export {EntryHeader};