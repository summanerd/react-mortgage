import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {CompareCalculator} from '../../../../src/client/ui/widgets/calculator-comparison.jsx';

describe('ui', function () {
    describe('widgets', function () {
        describe('Calculator Comparison', function () {
            describe('when rendered without configuration', function () {
                beforeEach(function () {
                    this.container = document.createElement('div');
                    document.body.appendChild(this.container);
                    this.SUT = mount(
                        <CompareCalculator />
                        , {attachTo: this.container}
                    );
                });

                afterEach(function () {
                    this.SUT.unmount();
                    document.body.removeChild(this.container)
                });

                it('should render two calculators', function () {
                    expect(this.SUT.find('MortgageCalculator').length).toEqual(2);
                });

                it('should display diff', function () {
                    expect(this.SUT.find('[data-region="mortgage-diff"]').length).toEqual(1);
                });

                it('should display purchase price as 110,000', function () {
                    const $loanAmountInputs = this.SUT.find('[data-field="purchasePrice"] input');
                    $loanAmountInputs.forEach(input=> expect(input.props().value).toEqual(110000));
                });

                it('should display down payment as 15,000', function () {
                    const $loanAmountInputs = this.SUT.find('[data-field="downPayment"] input');
                    $loanAmountInputs.forEach(input=> expect(input.props().value).toEqual(15000));
                });

                it('should disable loan amount', function () {
                    const $loanAmountInputs = this.SUT.find('[data-field="loanAmount"] input');
                    $loanAmountInputs.forEach(input=> expect(input.props().disabled).toEqual(true));
                });

                describe('when down payment is changed to 2,000', function () {
                    beforeEach(function (done) {
                        const $input = this.SUT.find('[data-field="downPayment"] input').last();

                        $input.simulate('change', {target: {value: '2000'}});

                        this.SUT.update();

                        setTimeout(done);
                    });

                    it('should display loan amount as 108,000', function () {
                        const $loanAmountInput = this.SUT.find('[data-field="loanAmount"] input').last();
                        expect($loanAmountInput.props().value).toEqual(108000);
                    });
                });
            });

            describe('when rendered with mortgage amount specified', function () {
                beforeEach(function () {
                    this.container = document.createElement('div');
                    document.body.appendChild(this.container);
                    this.SUT = mount(
                        <CompareCalculator purchasePrice={93279} downPayment={0}/>
                        , {attachTo: this.container}
                    );
                });

                afterEach(function () {
                    this.SUT.unmount();
                    document.body.removeChild(this.container)
                });

                it('should render two calculators', function () {
                    expect(this.SUT.find('MortgageCalculator').length).toEqual(2);
                });

                it('should display diff', function () {
                    expect(this.SUT.find('[data-region="mortgage-diff"]').length).toEqual(1);
                });

                it('should disable loan amount', function () {
                    const $loanAmountInputs = this.SUT.find('[data-field="loanAmount"] input');
                    $loanAmountInputs.forEach(input=> expect(input.props().disabled).toEqual(true));
                });

                it('total interest: $ 85,963.31', function () {
                    let monthlyPayment = this.SUT.find('MortgageSummary').last()
                        .find('[data-field="totalInterest"]')
                        .find('[data-container="value"]')
                        .text().trim();

                    expect(monthlyPayment).toMatch(/\$ 85,963.31$/);
                });

                describe('values in diff should be:', function () {
                    beforeEach(function () {
                        this.diffRegion = this.SUT.find('[data-region="mortgage-diff"]');
                    });

                    it('total time: 0 months 0 years', function () {
                        let totalTime = this.diffRegion
                            .find('[data-field="totalTime"]')
                            .find('[data-container="value"]')
                            .text().trim();

                        expect(totalTime).toMatch(/0 years 0 months/);
                    });

                    it('monthlyPayment: $ --', function () {
                        let monthlyPayment = this.diffRegion
                            .find('[data-field="monthlyPayment"]')
                            .find('[data-container="value"]')
                            .text().trim();

                        expect(monthlyPayment).toMatch(/\$ --$/);
                    });

                    it('total interest: $ --', function () {
                        let monthlyPayment = this.diffRegion
                            .find('[data-field="totalInterest"]')
                            .find('[data-container="value"]')
                            .text().trim();

                        expect(monthlyPayment).toMatch(/\$ --$/);
                    });
                });

                describe('and additional payment is updated to $100 /mo', function () {
                    beforeEach(function (done) {
                        this.calculator = this.SUT.find('MortgageCalculator').last();
                        this.input = this.calculator.find('[data-field="additional-payment"] input');
                        this.frequencySelect = this.calculator.find('[data-field="additional-frequency"] select');

                        this.input.simulate('focus')
                            .simulate('change', {target: {value: '100'}})
                            .simulate('blur');
                        this.frequencySelect.simulate('focus')
                            .simulate('change', {target: {value: '1'}});
                        this.SUT.update();

                        setTimeout(done);
                    });

                    it('additional amount should be \'100\'', function () {

                        expect(this.input.props().value).toEqual(100);
                    });

                    describe('values in diff should be:', function () {
                        beforeEach(function () {
                            this.diffRegion = this.SUT.find('[data-region="mortgage-diff"]');
                        });

                        it('total time: 9 years 1 months', function () {
                            let totalTime = this.diffRegion
                                .find('[data-field="totalTime"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(totalTime).toMatch(/9 years 1 months/);
                        });

                        it('monthlyPayment: $ --', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="monthlyPayment"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ --$/);
                        });

                        it('total interest: $ 29,414.66', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="totalInterest"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ 29,414.66$/);
                        });
                    });

                    describe('when amount of additional payment is changed to \'\'', function () {
                        beforeEach(function () {
                            this.input.simulate('focus')
                                .simulate('change', {target: {value: ''}})
                                .simulate('blur');
                            this.SUT.update();
                        });

                        it('additional amount should be blank', function () {

                            expect(this.input.props().value).toBeUndefined();
                        });
                    });
                });

                describe('and interest rate is changed to 3.95', function () {
                    beforeEach(function (done) {
                        this.calculator = this.SUT.find('MortgageCalculator').last();
                        this.input = this.calculator.find('[data-field="interestRate"] input');

                        this.input.simulate('focus')
                            .simulate('change', {target: {value: '3.95'}});
                        this.SUT.update();

                        setTimeout(done);
                    });

                    describe('values in diff should be:', function () {
                        beforeEach(function () {
                            this.diffRegion = this.SUT.find('[data-region="mortgage-diff"]');
                        });

                        it('total time: 0 years 0 months', function () {
                            let totalTime = this.diffRegion
                                .find('[data-field="totalTime"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(totalTime).toMatch(/0 years 0 months/);
                        });

                        it('monthlyPayment: $ 55.25', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="monthlyPayment"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ 55.25$/);
                        });

                        it('total interest: $ 19,890.62', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="totalInterest"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ 19,890.62$/);
                        });
                    });
                });

                describe('and points is changed to 1', function () {
                    beforeEach(function (done) {
                        this.calculator = this.SUT.find('MortgageCalculator').last();
                        this.summary = this.SUT.find('MortgageSummary').last();
                        this.input = this.calculator.find('[data-field="points"] input');

                        this.input.simulate('focus')
                            .simulate('change', {target: {value: '2'}});
                        this.SUT.update();

                        setTimeout(done);
                    });

                    it('total interest: $ 85,963.31', function () {
                        let monthlyPayment = this.summary
                            .find('[data-field="totalInterest"]')
                            .find('[data-container="value"]')
                            .text().trim();

                        expect(monthlyPayment).toMatch(/\$ 85,963.31$/);
                    });

                    it('total cost: $ 87,828.89', function () {
                        let monthlyPayment = this.summary
                            .find('[data-field="totalCost"]')
                            .find('[data-container="value"]')
                            .text().trim();

                        expect(monthlyPayment).toMatch(/\$ 87,828.89$/);
                    });

                    describe('values in diff should be:', function () {
                        beforeEach(function () {
                            this.diffRegion = this.SUT.find('[data-region="mortgage-diff"]');
                        });

                        it('total time: 0 years 0 months', function () {
                            let totalTime = this.diffRegion
                                .find('[data-field="totalTime"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(totalTime).toMatch(/0 years 0 months/);
                        });

                        it('monthlyPayment: $ --', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="monthlyPayment"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ --$/);
                        });

                        it('total interest: $ --', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="totalInterest"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ --$/);
                        });

                        it('total cost: $ (1,865.58)', function () {
                            let monthlyPayment = this.diffRegion
                                .find('[data-field="totalCost"]')
                                .find('[data-container="value"]')
                                .text().trim();

                            expect(monthlyPayment).toMatch(/\$ \(1,865.58\)$/);
                        });
                    });
                });
            });
        });
    });
});