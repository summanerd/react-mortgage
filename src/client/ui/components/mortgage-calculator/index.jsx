import React from 'react';
import Select from '../select.jsx';
import {ReadOnlyStacked, InputLabel, Headers} from '../../common';
import {format as f} from '../../../../imports/helpers';

const {SubSectionHeader} = Headers;

class MortgageCalculator extends React.Component {

    render() {
        const {
            initialBalance,
            interestRate,
            term,
            points,
            pointsCost,
            monthlyPayment,
            additionalPayment
        } = this.props.mortgage;

        return (
            <div data-region="mortgage-calculator">
                <form>
                    <div className="m-b--standard">
                        <InputLabel name="loanAmount" label="Loan Amount" >
                            <input type="text"
                                   id="txt-loan-amount"
                                   value={initialBalance}
                                   onChange={this.onMortgageChange.bind(this, 'initialBalance')}
                            />
                        </InputLabel>
                    </div>
                    <div className="m-b--standard">
                        <InputLabel name="interestRate" label="Interest Rate" >
                            <input type="text"
                                   id="txt-interest-rate"
                                   value={interestRate}
                                   onChange={this.onMortgageChange.bind(this, 'interestRate')}
                            />
                        </InputLabel>
                    </div>
                    <div className="m-b--standard">
                        <InputLabel name="points" label="Points" inlineHint={pointsCost ? `$ ${f.formatMoney(pointsCost)}` : ''}>
                            <input type="text"
                                   value={points}
                                   onChange={this.onMortgageChange.bind(this, 'points')}
                            />
                        </InputLabel>
                    </div>
                    <div className="m-b--standard">
                        <InputLabel name="term" label="Term" >
                            <input type="text"
                                   id="txt-term"
                                   value={term}
                                   onChange={this.onMortgageChange.bind(this, 'term')}
                            />
                        </InputLabel>
                    </div>
                    <div className="m-b--standard">
                        <ReadOnlyStacked name="monthlyPayment"
                                         label="Monthly Payments:"
                                         value={`$ ${f.formatMoney(monthlyPayment)}`}/>
                    </div>
                    <div data-region="additional-payment">
                        <SubSectionHeader title="Additional Payments" />
                        <div className="m-b--standard">
                            <InputLabel name="additional-payment" label="Payment" >
                                <input type="text"
                                       data-id="txt-additionalPayment-amount"
                                       value={additionalPayment.amount}
                                       onChange={this.onAdditionalPaymentChange.bind(this, 'amount')}
                                />
                            </InputLabel>
                        </div>
                        <div className="m-b--standard">
                            <InputLabel name="additional-frequency" label="Frequency" >
                                <Select data-id="sel-additionalPayment-frequency"
                                        value={additionalPayment.frequency}
                                        onChange={this.onAdditionalPaymentChange.bind(this, 'frequency')}
                                        options={[
                                            {label: 'Select Frequency', value: 0},
                                            {label: 'Monthly', value: 1},
                                            {label: 'Every Other Month', value: 2},
                                            {label: 'Quarterly', value: 3},
                                            {label: 'Semi-Annual', value: 6},
                                            {label: 'Annual', value: 12}
                                        ]}
                                        />
                            </InputLabel>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    onAdditionalPaymentChange(prop, event) {
        const {additionalPayment} = this.props.mortgage,
            val = parseFloat(getTextValueFromEvent(event));
        
        this.props.onChange('additionalPayment', Object.assign(
            {},
            additionalPayment,
            {[prop]: val}
        ));
    }

    onMortgageChange(prop, event) {
        this.props.onChange(prop, getTextValueFromEvent(event));
    }

}

function getTextValueFromEvent(event) {
    return event.target.value;
}

export default MortgageCalculator;