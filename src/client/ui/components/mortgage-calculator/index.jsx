import React from 'react';
import {getMonthlyPayment} from '../../../../imports/model/mortgage/helper';
import {ReadOnly} from '../../common';
import {format as f} from '../../../../imports/helpers';
import FixedMortgage from '../../../../imports/model/mortgage/fixed-mortgage';

import MortgageSummary from './summary.jsx';

class MortgageCalculator extends React.Component {
    mortgage;

    constructor(props) {
        super(props);

        this.mortgage = FixedMortgage.create({
            initialBalance: 93279,
            interestRate: 4.95,
            term: 30
        });

        this.state = this.mortgage.getDetails();
    }    

    render() {
        const {
            initialBalance,
            interestRate,
            term,
            monthlyPayment,
            schedule: summary
        } = this.state;

        return (
            <div>
                <form>
                    <div>
                        <label htmlFor="txt-loan-amount">
                            <input type="text"
                                   id="txt-loan-amount"
                                   value={initialBalance}
                                   onChange={this.onMortgageChange.bind(this, 'initialBalance')}
                            />
                            Loan Amount
                        </label>
                    </div>
                    <div>
                        <label htmlFor="txt-interest-rate">
                            <input type="text"
                                   id="txt-interest-rate"
                                   value={interestRate}
                                   onChange={this.onMortgageChange.bind(this, 'interestRate')}
                            />
                            Interest Rate
                        </label>
                    </div>
                    <div>
                        <label htmlFor="txt-term">
                            <input type="text"
                                   id="txt-term"
                                   value={term}
                                   onChange={this.onMortgageChange.bind(this, 'term')}
                            />
                            Term
                        </label>
                    </div>
                    <ReadOnly name="monthlyPayment"
                              label="Monthly Payments:"
                              value={`$ ${f.formatMoney(monthlyPayment)}`} />
                </form>
                <MortgageSummary summary={summary} />
            </div>
        );
    }

    onMortgageChange (prop, event) {
        this.mortgage[prop] = getTextValueFromEvent(event);
        this.setState(this.mortgage.getDetails());
    }

}

function getTextValueFromEvent(event) {
    return event.currentTarget.value;
}

export default MortgageCalculator;