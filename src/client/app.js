import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';

import MortgageCalculator from './mortgage-calculator.jsx';


class App extends React.Component {
    render() {
        return (
            <div>
                <p> Hello Mauricia, welcome to react!</p>
                <MortgageCalculator />
            </div>
        );
    }
}

render(<App/>, document.querySelector('[data-region="app"]'));