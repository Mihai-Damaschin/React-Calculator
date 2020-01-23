import React, {useState} from 'react';
import Square from "./components/Square/Square.module";
import './App.css';

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

const Calculator: React.FC = () => {
    const [calculableString, setCalculableString] = useState('');
    const [errorClasses, setErrorClasses] = useState();

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
                setCalculableString(calculableString + item);
                break;
            case ',':
            case '.':
                setCalculableString(calculableString + ".");
                break;
            case 'Enter':
            case '=':
                try {
                    // eslint-disable-next-line no-eval
                    setCalculableString(eval(calculableString).toString());
                } catch (e) {
                    setErrorClasses('active-error');
                    setTimeout(() => {
                        setErrorClasses("");
                    }, 1000)
                }
                break;
            case 'Backspace':
            case 'cancel':
                setCalculableString(calculableString.substring(0, calculableString.length - 1));
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
                <div className={'calculator-screen ' + errorClasses}>
                    <div className="calculator-result">
                        {calculableString}
                    </div>
                </div>
                {
                    buttonValues.map((element, key) => {
                            return (
                                <div key={key} className="calculator-row">
                                    {element.map((item, key) => {
                                            return <Square text={item}
                                                           key={key}
                                                           onClick={() => putTheRightEvent(item)}
                                            />
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