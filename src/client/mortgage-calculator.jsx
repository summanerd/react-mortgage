import React from 'react';
import {getMonthlyPayment} from '../imports/model/mortgage/helper';
import {format as f} from '../imports/helpers';

class MortgageCalculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loanAmount: 100000,
            interestRate: 4.15,
            term: 30
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
            term
        } = this.state;

        const monthlyPayment = getMonthlyPayment({initialBalance: loanAmount, paymentFrequency: 12, term, interestRate});
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
                        <p>Monthly Payments: ${f.formatMoney(monthlyPayment)}</p>
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