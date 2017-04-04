import {Property} from '../import';


describe('Model', function () {
    describe('Property', function () {

        describe('when inititialized', function () {

            beforeEach(function () {
                this.SUT = Property().create();
            });

            it('purchase price should be 0', function () {
                expect(this.SUT.purchasePrice).toBe(0);
            });

            it('down payment should be 0', function () {
                expect(this.SUT.downPayment).toBe(0);
            });

            it('equity should be 0', function () {
                expect(this.SUT.equity).toBe(0);
            });

            it('home value should be 0', function () {
                expect(this.SUT.homeValue).toBe(0);
            });

            it('hasAppraisals should be false', function () {
                expect(this.SUT.hasAppraisals).toBe(false);
            });

            it('hasMortgages should be false', function () {
                expect(this.SUT.hasMortgages).toBe(false);
            });
        });

        describe('when purchase price is 100,000 and house is worth 120,000', function () {

            beforeEach(function () {
                this.SUT = Property().create({purchasePrice: 100000});
                this.SUT.addValue({homeValue: 120000})
                this.SUT.addMortgage({balance: 85000})
            });

            describe('and mortgage is $85,000', function () {

                it('hasAppraisals should be true', function () {
                    expect(this.SUT.hasAppraisals).toBe(true);
                });

                it('home value should be 120,000', function () {
                    expect(this.SUT.homeValue).toBe(120000);
                });

                it('purchase price should be 100,000', function () {
                    expect(this.SUT.purchasePrice).toBe(100000);
                });

                it('equity should be 35,000', function () {
                    expect(this.SUT.equity).toBe(35000);
                });
            });
        });
    });
});