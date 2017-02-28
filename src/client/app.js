import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
require('../styles/main.scss');

import {CompareCalculator} from './ui/widgets/calculator-comparison.jsx';


class App extends React.Component {
    render() {
        return (
            <div>
                <CompareCalculator />
            </div>
        );
    }
}

render(<App/>, document.querySelector('[data-region="app"]'));