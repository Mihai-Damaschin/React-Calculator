import React from 'react';
import './calculator.css';

/**
 *
 * @param text
 * @param onClick
 * @constructor
 */
function Square(text: string, onClick?: any) {
    return <button className="calculator-square"
                   value={text}
                   disabled={text === ''}
                   onClick={onClick}
    >
        {text}
    </button>
}

/**
 *
 * @param value
 * @constructor
 */
function CalculatorResult(value: any) {
    return <div
        className="calculator-result"
    >
        {value}
    </div>
}

interface calculatorProps {

}

interface calculatorState {
    CalculableString: string
    Classes: string
}

class Calculator extends React.Component<calculatorProps, calculatorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            CalculableString: '',
            Classes: ''
        };

        window.addEventListener('keydown', (event) => {
            this.putTheRightEvent(event.key);
        });
    }

    /**
     *
     * @param item
     */
    putTheRightEvent(item: string) {
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
                this.setState({
                    CalculableString: this.state.CalculableString + item,
                });
                break;
            case '/':
            case '*':
            case '-':
            case '+':
                this.setState({
                    CalculableString: this.state.CalculableString + item,
                });
                break;
            case ',':
            case '.':
                this.setState({
                    CalculableString: this.state.CalculableString + '.',
                });
                break;
            case 'Enter':
            case '=':
                this.getCalculableResult(this.state.CalculableString);
                break;
            case 'Backspace':
            case 'cancel':
                this.setState({
                    CalculableString: this.state.CalculableString.substring(0, this.state.CalculableString.length - 1),
                });
                break;
            case 'c':
                this.setState({
                    CalculableString: ''
                });
                break;
            default:
                break;
        }
    }

    /**
     *
     * @param value
     */
    getCalculableResult(value: string) {
        try {
            this.setState({
                CalculableString: eval(value).toString(),
            });
        } catch (e) {
            this.setState({
                Classes: 'active-error'
            });
            setTimeout(() => {
                this.setState({
                    Classes: ''
                })
            }, 1000)
        }
    }

    render() {
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
        let errorClasses = this.state.Classes;

        return (
            <div className="calculator">
                <div className="calculator-buttons">
                    <div className={'calculator-screen ' + errorClasses}>
                        {
                            CalculatorResult(this.state.CalculableString)
                        }
                    </div>
                    {
                        buttonValues.map((element, key) => {
                                return (
                                    <div className="calculator-row">
                                        {element.map((item, key) => {
                                                return Square(item, () => this.putTheRightEvent(item))
                                            }
                                        )}
                                    </div>)
                            }
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Calculator;