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

        describe('when purchase price is 110,000 and down payment is 15,000', function () {

            beforeEach(function () {
                this.SUT = Property().create({purchasePrice: 110000, downPayment: 15000});
            });

            it('downPayment should be 15,000', function () {
                expect(this.SUT.downPayment).toBeLessThan(15000.01);
                expect(this.SUT.downPayment).toBeGreaterThan(14999.99);
            });

            it('downPaymentPercent should be 13.64%', function () {
                expect(this.SUT.downPaymentPercent).toBeLessThan(.1365);
                expect(this.SUT.downPaymentPercent).toBeGreaterThan(.1363);
            });

            it('financing needed should be 95,000', function () {
                expect(this.SUT.financingNeeded).toBe(95000);
            });

            describe('when down payment is changed to 2,000', function () {
                beforeEach(function () {
                    this.SUT.downPayment = 2000;
                });

                it('downPayment should be 2,000', function () {
                    expect(this.SUT.downPayment).toBeLessThan(2000.01);
                    expect(this.SUT.downPayment).toBeGreaterThan(1999.99);
                });

                it('downPaymentPercent should be 1.82%', function () {
                    expect(this.SUT.downPaymentPercent).toBeLessThan(.0183);
                    expect(this.SUT.downPaymentPercent).toBeGreaterThan(.0181);
                });

                it('financing needed should be 108,000', function () {
                    expect(this.SUT.financingNeeded).toBe(108000);
                });

                it('total financing should be 0', function () {
                    expect(this.SUT.totalFinancing).toBe(0);
                });
            });

            describe('when down payment is to an empty string', function () {
                beforeEach(function () {
                    this.SUT.downPayment = '';
                });

                it('downPayment should be an empty string', function () {
                    expect(this.SUT.downPayment).toEqual('');
                });

                it('downPaymentPercent should be 0%', function () {
                    expect(this.SUT.downPaymentPercent).toEqual(0);
                });

                it('financing needed should be 110,000', function () {
                    expect(this.SUT.financingNeeded).toBe(110000);
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