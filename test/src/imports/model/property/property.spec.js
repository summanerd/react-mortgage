import {Property} from '../import';


describe('Model', function () {
    describe('Property', function () {

        describe('when initialized', function () {

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

        describe('when purchase price is 100,000 and down payment is 14%', function () {

            beforeEach(function () {
                this.SUT = Property().create({purchasePrice: 100000});
                this.SUT.setDownPaymentByPercent(.14);
            });

            it('downPayment should be 14,000', function () {
                expect(this.SUT.downPayment).toBeLessThan(14000.01);
                expect(this.SUT.downPayment).toBeGreaterThan(13999.99);
            });

            it('financing needed should be 86,000', function () {
                expect(this.SUT.financingNeeded).toBe(86000);
            });
        });

        describe('when purchase price is 100,000 and down payment is 13,000', function () {

            beforeEach(function () {
                this.SUT = Property().create({purchasePrice: 100000, downPayment: 13000});
            });

            it('downPayment should be 13,000', function () {
                expect(this.SUT.downPayment).toBeLessThan(13000.01);
                expect(this.SUT.downPayment).toBeGreaterThan(12999.99);
            });

            it('downPaymentPercent should be 13%', function () {
                expect(this.SUT.downPaymentPercent).toBeLessThan(.131);
                expect(this.SUT.downPaymentPercent).toBeGreaterThan(.12);
            });

            it('financing needed should be 87,000', function () {
                expect(this.SUT.financingNeeded).toBe(87000);
            });

            describe('when purchase price is changed to 10,000', function () {
                beforeEach(function () {
                    this.SUT.purchasePrice = 10000;
                });

                it('financing needed should be 87,000', function () {
                    expect(this.SUT.financingNeeded).toBe(0);
                });
            });

            describe('when purchase price is changed to 1,000,000', function () {
                beforeEach(function () {
                    this.SUT.purchasePrice = 1000000;
                });

                it('financing needed should be 987,000', function () {
                    expect(this.SUT.financingNeeded).toBe(987000);
                });
            });
        });

        describe('when purchase price is 100,000 and house is worth 120,000', function () {

            beforeEach(function () {
                this.SUT = Property().create({purchasePrice: 100000});
                this.SUT.addValue({homeValue: 120000});
                this.SUT.addMortgage({balance: 85000});
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