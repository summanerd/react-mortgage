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

let appContainer = document.querySelector('[data-region="app"]');

if (!appContainer){
    let div = document.createElement('div');
    div.setAttribute('data-region', 'app');
    document.body.appendChild(div);
    appContainer = document.querySelector('[data-region="app"]');
}

render(<App/>, appContainer);