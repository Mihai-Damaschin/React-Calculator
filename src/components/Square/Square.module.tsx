import React from "react";

interface squareState {
    text: string,
    key: number,
    onClick: any
}

const Square = (props: squareState) => {
    return <button className="calculator-square"
                   value={props.text}
                   disabled={props.text === ''}
                   onClick={props.onClick}
                   key={props.key}
    >
        {props.text}
    </button>
};

export default Square