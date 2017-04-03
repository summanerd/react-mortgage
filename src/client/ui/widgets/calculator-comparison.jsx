import React from 'react';
import {render} from 'react-dom';

import {FixedMortgage} from '../../../imports/model/mortgage/mortgage.factory';
import MortgageCalculator from '../components/mortgage-calculator/index.jsx';
import MortgageDiff from '../components/mortgage-diff.jsx';
import {Headers} from '../common';

const {SectionTitle, PageTitle} = Headers;
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
                        <PageTitle title="Compare Mortgage" />
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
                        <SectionTitle title="Difference" />
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

        state.compare = Object.keys(state.mortgages).slice(0, props.numberOfCalculators);
        this.state = state;
        
    }

    getDiff () {
        const baseMortgage = this.mortgages[this.state.compare[0]];
        const mortgageDetails = this.state.mortgages[this.state.compare[1]];
        return baseMortgage.getDiff(mortgageDetails);
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