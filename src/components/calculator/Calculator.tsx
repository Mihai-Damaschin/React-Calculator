import React, { useState } from 'react';
import './calculator.css';

const buttonValues = [
    [
        'c',
        'cancel',
        '=',
        '/'
    ],
    [
        '7',
        '8',
        '9',
        '*'
    ],
    [
        '4',
        '5',
        '6',
        '-'
    ],
    [
        '1',
        '2',
        '3',
        '+'
    ],
    [
        '',
        '0',
        '.',
        ''
    ]
];

const Calculator = () => {
    const [CalculableString, setCalculableString] = useState('');
    const [ErrorClasses, setErrorClasses] = useState('');

    function Square(text: string, key: number, onClick?: any) {
        return <button className="calculator-square"
                       value={text}
                       disabled={text === ''}
                       onClick={onClick}
                       key={key}
        >
            {text}
        </button>
    }

    function putTheRightEvent(item: string) {
        switch (item) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
            case '/':
            case '*':
            case '-':
            case '+':
                setCalculableString(CalculableString + item);
                break;
            case ',':
            case '.':
                setCalculableString(CalculableString + ".");
                break;
            case 'Enter':
            case '=':
                try {
                    // eslint-disable-next-line no-eval
                    setCalculableString(eval(CalculableString).toString());
                } catch (e) {
                    setErrorClasses('active-error');
                    setTimeout(() => {
                        setErrorClasses("");
                    }, 1000)
                }
                break;
            case 'Backspace':
            case 'cancel':
                setCalculableString(CalculableString.substring(0, CalculableString.length - 1));
                break;
            case 'c':
                setCalculableString("");
                break;
            default:
                break;
        }
    }

    return (
        <div className="calculator">
            <div className="calculator-buttons">
                <div className={'calculator-screen ' + ErrorClasses}>
                    <div className="calculator-result">
                        {CalculableString}
                    </div>
                </div>
                {
                    buttonValues.map((element, key) => {
                            return (
                                <div key={key} className="calculator-row">
                                    {element.map((item, key) => {
                                            return Square(item, key, () => putTheRightEvent(item))
                                        }
                                    )}
                                </div>)
                        }
                    )
                }
            </div>
        </div>
    );
};

export default Calculator;