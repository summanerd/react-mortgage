import React from 'react';

import {ReadOnlyStacked} from '../common';
import {format as f} from '../../../imports/helpers';


export default function (props) {
    const {diff: {totalTime, totalInterest, monthlyPayment}} = props;

    return (
        <div data-region="mortgage-diff">
            <div className="m-b--standard">
                <ReadOnlyStacked name="totalTime"
                                 label="Total Time"
                                 value={`${totalTime.years} years ${totalTime.months} months`}/>
            </div>

            <div className="m-b--standard">
                <ReadOnlyStacked name="monthlyPayment"
                                 label="Monthly Payment"
                                 value={`$ ${f.formatMoney(monthlyPayment)}`}/>
            </div>

            <div className="m-b--standard">
                <ReadOnlyStacked name="totalInterest"
                                 label="Total Interest:"
                                 value={`$ ${f.formatMoney(totalInterest)}`}/>
            </div>
        </div>
    );
}