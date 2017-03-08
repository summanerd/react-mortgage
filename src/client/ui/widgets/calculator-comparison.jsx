import React from 'react';
import {render} from 'react-dom';

import FixedMortgage from '../../../imports/model/mortgage/fixed-mortgage';
import {getMortgageDiff} from '../../../imports/model/mortgage/helper';
import MortgageCalculator from '../components/mortgage-calculator/index.jsx';
import MortgageDiff from '../components/mortgage-diff.jsx';

const defaultMortgage = {
    initialBalance: 93279,
    interestRate: 4.95,
    term: 30
};


export class CompareCalculator extends React.Component {
    
    constructor(props){
        super(props);
        this.initializeState(props);
    }
    
    render() {
        const mortgages = Object.keys(this.state.mortgages);

        return (
            <div data-region="calculator-comparison">

                <div className="row">
                    <div className="column small-12">
                        <div className="page-title">
                            <h1>Compare Mortgage</h1>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <section className="column small-12 large-6">
                        <div className="row">

                            {mortgages.map((mortgageName)=>{
                                const mortgage = this.state.mortgages[mortgageName];
                                return (
                                    <div key={mortgageName} className="column small-12 large-6">
                                        <MortgageCalculator mortgage={mortgage} onChange={this.onChange.bind(this, mortgageName)}/>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                    <section className="column small-12 large-6 end">
                        <header className="section-title">
                            <h2>Difference</h2>
                        </header>
                        <MortgageDiff diff={this.getDiff()} />
                    </section>
                </div>
            </div>
        );
    }
    
    initializeState (props) {
        this.mortgages = {};
        let state = {mortgages: {}};

        for (let i = 0; i < props.numberOfCalculators; i++){
            const key = `mortgage${i + 1}`;
            this.mortgages[key] = FixedMortgage.create(defaultMortgage);
            state.mortgages[key] = this.mortgages[key].getDetails();
        }

        state.compare = Object.keys(state.mortgages).slice(0, 2);
        this.state = state;
        
    }

    getDiff () {
        const mortgageDetails = this.state.compare.map(name=> this.state.mortgages[name]);
        return getMortgageDiff.apply(null, mortgageDetails);
    }
    
    onChange(mortgageProp, prop, value) {
        const mortgage = this.mortgages[mortgageProp];

        mortgage[prop] = value;
        const mortgages = Object.assign({},
            this.state.mortgages,
            {
                [mortgageProp]: mortgage.getDetails()
            }
        );

        this.setState({mortgages});
    }
}

CompareCalculator.defaultProps = {
    numberOfCalculators: 2
};