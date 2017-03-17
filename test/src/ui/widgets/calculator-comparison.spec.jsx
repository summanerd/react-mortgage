import React from 'react';
import {shallow, mount, render} from 'enzyme';
import {CompareCalculator} from '../../../../src/client/ui/widgets/calculator-comparison.jsx';

describe('ui', function () {
    describe('widgets', function () {
        describe('Calculator Comparison', function () {
            describe('when rendered without configuration', function () {
                beforeEach(function () {
                    this.SUT = mount(<CompareCalculator />);
                });

                it('should render two calculators', function () {
                    expect(this.SUT.find('MortgageCalculator').length).toEqual(2);
                });

                it('should display diff', function () {
                    expect(this.SUT.find('[data-region="mortgage-diff"]').length).toEqual(1);
                });

                describe('values in diff should be:', function () {
                    beforeEach(function(){
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
                        this.input = this.calculator.find('#txt-additionalPayment-amount');
                        this.frequencySelect = this.calculator.find('#sel-additionalPayment-frequency');

                        this.input.simulate('focus')
                            .simulate('change', { target: { value: '100' } });
                        this.frequencySelect.simulate('focus')
                            .simulate('change', { target: { value: '1' } });
                        this.SUT.update();

                        setTimeout(done);
                    });

                    describe('values in diff should be:', function () {
                        beforeEach(function(){
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
                });

                describe('and interest rate is changed to 3.95', function () {
                    beforeEach(function (done) {
                        this.calculator = this.SUT.find('MortgageCalculator').last();
                        this.input = this.calculator.find('#txt-interest-rate');

                        this.input.simulate('focus')
                            .simulate('change', { target: { value: '3.95' } });
                        this.SUT.update();

                        setTimeout(done);
                    });

                    describe('values in diff should be:', function () {
                        beforeEach(function(){
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
            });
        });
    });
});