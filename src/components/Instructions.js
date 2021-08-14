import React, { useEffect, useState } from 'react';


const Instructions = (props) => {

    const [instructions, setInstructions] = useState([]);

    useEffect(() => {
        setInstructions(props.instructions);

        // console.log('instructions: ' + instructions);
    }, [props.instructions]);

    return(
        <div>
            <ol>
            <div>
            {props.instructions.map((item, key)=><li><span>{item.step}</span></li>)}
            </div>
            </ol>
        </div>
    );
}

export default Instructions;