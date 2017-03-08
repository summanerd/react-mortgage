import React from 'react';
import {ReadOnlyStacked} from '../../common';
import {format as f} from '../../../../imports/helpers';

import MortgageSummary from './summary.jsx';

class MortgageCalculator extends React.Component {

    render() {
        const {
            initialBalance,
            interestRate,
            term,
            monthlyPayment,
            additionalPayment,
            schedule: summary
        } = this.props.mortgage;

        return (
            <div>
                <form>
                    <div className="m-b--standard">
                        <label htmlFor="txt-loan-amount">
                            <input type="text"
                                   id="txt-loan-amount"
                                   value={initialBalance}
                                   onChange={this.onMortgageChange.bind(this, 'initialBalance')}
                            />
                            Loan Amount
                        </label>
                    </div>
                    <div className="m-b--standard">
                        <label htmlFor="txt-interest-rate">
                            <input type="text"
                                   id="txt-interest-rate"
                                   value={interestRate}
                                   onChange={this.onMortgageChange.bind(this, 'interestRate')}
                            />
                            Interest Rate
                        </label>
                    </div>
                    <div className="m-b--standard">
                        <label htmlFor="txt-term">
                            <input type="text"
                                   id="txt-term"
                                   value={term}
                                   onChange={this.onMortgageChange.bind(this, 'term')}
                            />
                            Term
                        </label>
                    </div>
                    <div className="m-b--standard">
                        <ReadOnlyStacked name="monthlyPayment"
                                         label="Monthly Payments:"
                                         value={`$ ${f.formatMoney(monthlyPayment)}`}/>
                    </div>
                    <div>

                        <div className="m-b--standard">
                            <label htmlFor="txt-additionalPayment-amount">
                                <input type="text"
                                       id="txt-additionalPayment-amount"
                                       value={additionalPayment.amount}
                                       onChange={this.onAdditionalPaymentChange.bind(this, 'amount')}
                                />
                                Payment
                            </label>
                            <label htmlFor="txt-additionalPayment-frequency">
                                <input type="text"
                                       id="txt-additionalPayment-frequency"
                                       value={additionalPayment.frequency}
                                       onChange={this.onAdditionalPaymentChange.bind(this, 'frequency')}
                                />
                                Frequency
                            </label>
                        </div>
                    </div>
                </form>
                <MortgageSummary summary={summary}/>
            </div>
        );
    }

    onAdditionalPaymentChange(prop, event) {
        const {additionalPayment} = this.props.mortgage;
        this.props.onChange('additionalPayment', Object.assign(
            {},
            additionalPayment,
            {[prop]: parseFloat(getTextValueFromEvent(event))}
        ));
    }

    onMortgageChange(prop, event) {
        this.props.onChange(prop, getTextValueFromEvent(event));
    }

}

function getTextValueFromEvent(event) {
    return event.currentTarget.value;
}

export default MortgageCalculator;