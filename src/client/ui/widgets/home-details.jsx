import React from 'react';
import {ReadOnlyStacked, InputLabel, Headers} from '../common';
import {format as f} from '../../../imports/helpers';

export default function (props) {
    const {downPaymentPercent, downPayment, purchasePrice} = props.home;
    return (
        <div data-region="home-details">

            <div className="m-b--standard">
                <InputLabel name="purchasePrice" label="Purchase Price">
                    <input type="text"
                           value={purchasePrice}
                           onChange={ev=> props.onChange('purchasePrice', ev.target.value)}
                    />
                </InputLabel>
            </div>

            <div className="m-b--standard">
                <InputLabel name="downPayment"
                            label="Down Payment"
                            inlineHint={downPaymentPercent ? `${f.formatPercent(downPaymentPercent)} %` : ''} >
                    <input type="text"
                           value={downPayment}
                           onChange={ev=> props.onChange('downPayment', ev.target.value)}
                    />
                </InputLabel>
            </div>
        </div>
    );
}