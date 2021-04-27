import React from 'react';

const Question = ({posts, valeur, name}) => {
    return (
        <div>
            <p>{posts[0].questions[valeur].text}</p>
            <input
            type="radio"
            name={name}
            id="1"
            />
            <label>oui</label>
            <input
            type="radio"
            name={name}
            id="2"
            />
            <label>non</label>           
        </div>
    );
};

export default Question;