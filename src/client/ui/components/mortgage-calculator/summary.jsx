import React from 'react';
import {ReadOnlyStacked, Headers} from '../../common';
import {dateHelper, format as f} from '../../../../imports/helpers';

const {SubSectionHeader} = Headers;

export default function (props) {
    const {summary} = props;

    return (
        <div data-region="mortgage-summary">
            <SubSectionHeader title="Summary" />

            <div className="m-b--standard">
                <ReadOnlyStacked name="totalInterest"
                                 label="Total Interest"
                                 value={`$ ${f.formatMoney(summary.totalInterest)}`}/>
            </div>

            <div className="m-b--standard">
                <ReadOnlyStacked name="totalTime"
                                 label="Total Time"
                                 value={`${summary.totalTime.years} years ${summary.totalTime.months} months`}/>
            </div>

            <div className="m-b--standard">
                <ReadOnlyStacked name="endDate"
                                 label="End Date"
                                 value={`${dateHelper.getFullMonth(summary.amortizationDate, true)} ${summary.amortizationDate.getFullYear()}`}/>

            </div>
        </div>
    );
};