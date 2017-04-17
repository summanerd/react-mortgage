import React from 'react';
import {render} from 'react-dom';

import {FixedMortgage} from '../../../imports/model/mortgage/mortgage.factory';
import Property from '../../../imports/model/property/property';
import MortgageCalculator from '../components/mortgage-calculator/index.jsx';
import MortgageSummary from '../components/mortgage-calculator/summary.jsx';
import MortgageDiff from '../components/mortgage-diff.jsx';
import {Headers} from '../common';
import HomeDetails from './home-details.jsx';

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

                            {mortgages.map((name)=>{
                                const mortgage = this.state.mortgages[name];
                                return (
                                    <div key={name} data-mortgage={name} className="column small-12 large-6">
                                        <HomeDetails home={this.state.homes[name]} onChange={this.onHomeChange.bind(this, name)} />
                                        <MortgageCalculator mortgage={mortgage} disableLoanAmount={true} onChange={this.onChange.bind(this, name)}/>
                                        <MortgageSummary mortgage={mortgage}/>
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
        const {purchasePrice, downPayment} = props;
        this.mortgages = {};
        let state = {mortgages: {}, homes: {}};

        for (let i = 0; i < props.numberOfCalculators; i++){
            const key = `mortgage${i + 1}`;
            const home = Property().create({purchasePrice, downPayment}),
                mortgage = FixedMortgage.create({...defaultMortgage, initialBalance: home.financingNeeded});
            home.addMortgage(mortgage);
            this.mortgages[key] = mortgage;
            state.mortgages[key] = this.mortgages[key].getDetails();
            state.homes[key] = home;
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

    onHomeChange(name, prop, value) {
        let home = this.state.homes[name];

        home[prop] = value;
        const homes = Object.assign({},
            this.state.homes,
            {
                [name]: home
            }
        );

        const newBalance = home.purchasePrice - home.downPayment;
        this.onChange(name, 'initialBalance', newBalance < 0 ? 0 : newBalance);
        this.setState({homes});
    }
}

CompareCalculator.defaultProps = {
    numberOfCalculators: 2,
    purchasePrice: 110000,
    downPayment: 15000
};