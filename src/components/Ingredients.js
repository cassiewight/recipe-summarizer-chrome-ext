import React, { useEffect, useState } from 'react';


const Ingredients = (props) => {
    // console.log('ingredients: ' + props.ingredients);
    

    return(
        <div>
            <ol>
            {props.ingredients.map((item, key)=><li>
                {/* <span>{item.measures.us.amount}</span>&nbsp;<span>{item.measures.us.unitShort}</span>&nbsp; */}
                <span>{ item.originalString }</span>
                </li>)}
            </ol>
        </div>
    );
}

export default Ingredients;