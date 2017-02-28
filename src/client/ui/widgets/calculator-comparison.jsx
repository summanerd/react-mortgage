import React from 'react';
import {render} from 'react-dom';

import MortgageCalculator from '../components/mortgage-calculator/index.jsx';


export class CompareCalculator extends React.Component {
    render() {
        return (
            <div>
                <MortgageCalculator />
                <MortgageCalculator />
            </div>
        );
    }
}