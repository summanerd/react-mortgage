import React from 'react';
import {onTextFieldChange} from './utils/form/onChange';

class MortgageCalculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loanAmount: 100000,
            interestRate: 4.15,
            term: 30,
            monthlyPayment: 543.23
        };
        this.onLike = this.onLike.bind(this);
    }

    onLike () {
        let newLikesCount = this.state.likesCount + 1;
        this.setState({likesCount: newLikesCount});
    }

    render() {
        const {
            loanAmount,
            interestRate,
            term,
            monthlyPayment
        } = this.state;

        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="txt-loan-amount">
                            <input type="text"
                                   id="txt-loan-amount"
                                   value={loanAmount}
                                   onChange={this.onFieldChange.bind(this, 'loanAmount')}
                            />
                            Loan Amount
                        </label>
                    </div>
                    <div>
                        <label htmlFor="txt-interest-rate">
                            <input type="text"
                                   id="txt-interest-rate"
                                   value={interestRate}
                                   onChange={this.onFieldChange.bind(this, 'interestRate')}
                            />
                            Interest Rate
                        </label>
                    </div>
                    <div>
                        <label htmlFor="txt-term">
                            <input type="text"
                                   id="txt-term"
                                   value={term}
                                   onChange={this.onFieldChange.bind(this, 'term')}
                            />
                            Term
                        </label>
                    </div>
                    <div>
                        <p>Monthly Payments: ${monthlyPayment}</p>
                    </div>
                </form>
            </div>
        );
    }

    onFieldChange (prop, event) {
        this.updateState(prop, getTextValueFromEvent(event));
    }

    updateState(prop, val) {
        this.setState({[prop]: val});
    }

}

function getTextValueFromEvent(event) {
    return event.currentTarget.value;
}

export default MortgageCalculator;