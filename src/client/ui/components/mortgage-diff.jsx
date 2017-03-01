import React from 'react';

import {ReadOnly} from '../common';
import {format as f} from '../../../imports/helpers';


export default function (props) {
    const {diff: {totalTime, totalInterest, monthlyPayment}} = props;
    
    return (
        <div data-region="mortgage-diff">

            <ReadOnly name="totalTime"
                      label="Total Time"
                      value={`${totalTime.years} years ${totalTime.months} months`} />

            <ReadOnly name="monthlyPayment"
                      label="Monthly Payment"
                      value={`$ ${f.formatMoney(monthlyPayment)}`} />

            <ReadOnly name="totalInterest"
                      label="Total Interest:"
                      value={`$ ${f.formatMoney(totalInterest)}`} />
        </div>
    )
}