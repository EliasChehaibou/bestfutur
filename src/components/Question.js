import React from 'react';

const Question = ({posts, valeur, name}) => {
    if (posts[0].type=="oui/non") {
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
        )}
    return (
        <div>
            <p>{posts[0].questions[valeur].text}</p>
            <input
            type="radio"
            name={name}
            id="1"
            />
            <label>{posts[0].questions[valeur].answers[0].answerText}</label>
            <input
            type="radio"
            name={name}
            id="2"
            />
            <label>{posts[0].questions[valeur].answers[1].answerText}</label>
            <input
            type="radio"
            name={name}
            id="3"
            />
            <label>{posts[0].questions[valeur].answers[1].answerText}</label>
            <input
            type="radio"
            name={name}
            id="4"
            />
            <label>{posts[0].questions[valeur].answers[0].answerText}</label>           
        </div>
    )
};

export default Question;