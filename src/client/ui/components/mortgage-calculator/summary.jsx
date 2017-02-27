import React from 'react';
import {dateHelper, format as f} from '../../../../imports/helpers'

export default function (props) {
    const {summary} = props;

    return (
        <div data-region="mortgage-summary">
            <h3>Summary</h3>
            <div>
                <label>Total Interest</label>
                <span>{f.formatMoney(summary.totalInterest)}</span>
            </div>

            <div>
                <label>Total Time</label>
                <span>{summary.totalTime.years} years {summary.totalTime.months} months</span>
            </div>

            <div>
                <label>End Date</label>
                <span>{`${dateHelper.getFullMonth(summary.amortizationDate, true)} ${summary.amortizationDate.getFullYear()}`}</span>
            </div>
        </div>
    );
};