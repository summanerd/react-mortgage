import React from 'react';
import {ReadOnly} from '../../common';
import {dateHelper, format as f} from '../../../../imports/helpers'

export default function (props) {
    const {summary} = props;

    return (
        <div data-region="mortgage-summary">
            <h3>Summary</h3>
            <ReadOnly name="totalInterest"
                      label="Total Interest"
                      value={`$ ${f.formatMoney(summary.totalInterest)}`} />
            <ReadOnly name="totalTime"
                      label="Total Time"
                      value={`${summary.totalTime.years} years ${summary.totalTime.months} months`} />
            <ReadOnly name="endDate"
                      label="End Date"
                      value={`${dateHelper.getFullMonth(summary.amortizationDate, true)} ${summary.amortizationDate.getFullYear()}`} />

        </div>
    );
};