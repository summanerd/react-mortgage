import {Mortgage} from '../import';

const {FixedMortgage} = Mortgage;

describe('Model', function () {
    describe('Mortgage', function () {
        describe('Fixed Mortgage', function () {
    
            describe('when loan details are not specified', function () {

                beforeEach(function(){
                    this.SUT = FixedMortgage.create({});

                    this.mortgageDetails = this.SUT.getDetails();
                });
    
                it('should have monthly payment of 0', function(){
                    expect(this.mortgageDetails.monthlyPayment).toBe(0);
                });

                it('should have time of 0 years 0 months', function(){
                    const time = this.mortgageDetails.schedule.totalTime;
                    expect(time.months).toBe(0);
                    expect(time.years).toBe(0);
                });

                it('should have total interest 0', function(){
                    expect(this.mortgageDetails.schedule.totalInterest).toBe(0);
                });

                it('should have end date equal to current date', function(){
                    const {amortizationDate} = this.mortgageDetails.schedule,
                        currentDate = new Date;
                    expect(amortizationDate.getFullYear()).toBe(currentDate.getFullYear());
                    expect(amortizationDate.getMonth()).toBe(currentDate.getMonth());
                });
            });

            describe('when loan amount is 93,279, interest rate 4.95, and term is 30, start date March 1, 2000', function () {

                beforeEach(function(){
                    this.SUT = FixedMortgage.create({
                        initialBalance: 93279,
                        interestRate: 4.95,
                        term: 30,
                        startDate: new Date(2000, 2)
                    });

                    this.mortgageDetails = this.SUT.getDetails();
                });

                it('should have monthly payment of 497.90', function(){
                    expect(this.mortgageDetails.monthlyPayment).toBeGreaterThan(497.89);
                    expect(this.mortgageDetails.monthlyPayment).toBeLessThan(497.91);
                });

                it('should have time of 30 years 0 months', function(){
                    const time = this.mortgageDetails.schedule.totalTime;
                    expect(time.months).toBe(0);
                    expect(time.years).toBe(30);
                });

                it('should have total interest', function(){
                    expect(this.mortgageDetails.schedule.totalInterest).toBeGreaterThan(85963.30);
                    expect(this.mortgageDetails.schedule.totalInterest).toBeLessThan(85963.32);
                });

                it('should have end date March 2030', function(){
                    const {amortizationDate} = this.mortgageDetails.schedule;
                    expect(amortizationDate.getFullYear()).toBe(2030);
                    expect(amortizationDate.getMonth()).toBe(2);
                });

                describe('#getDiff', function(){
                    describe('when compared with a similar mortgage that has an interest rate of 3.95', function(){

                        beforeEach(function(){
                            const otherMortgage = FixedMortgage.create({
                                initialBalance: 93279,
                                interestRate: 3.95,
                                term: 30,
                                startDate: new Date(2000, 2)
                            });
                            this.diff = this.SUT.getDiff(otherMortgage.getDetails());
                        });

                        it('should not have a difference in time', function(){
                            const {totalTime} = this.diff;
                            expect(totalTime.months).toBe(0);
                            expect(totalTime.years).toBe(0);
                        });

                        it('should have a difference in monthly payment +55.25', function(){
                            const {monthlyPayment} = this.diff;
                            expect(monthlyPayment).toBeGreaterThan(55.249);
                            expect(monthlyPayment).toBeLessThan(55.26);
                        });

                        it('should have a difference in total interest +19,890.62', function(){
                            const {totalInterest} = this.diff;
                            expect(totalInterest).toBeGreaterThan(19890.619);
                            expect(totalInterest).toBeLessThan(19890.63);
                        });
                    });

                    describe('when compared with a similar mortgage that has an additional payment 100 every other month', function(){

                        beforeEach(function(){
                            const otherMortgage = FixedMortgage.create({
                                initialBalance: 93279,
                                interestRate: 4.95,
                                term: 30,
                                startDate: new Date(2000, 2)
                            });
                            otherMortgage.additionalPayment = {amount: 100, frequency: 2};
                            this.diff = this.SUT.getDiff(otherMortgage.getDetails());
                        });

                        it('should not have 5 year 5 month difference in time', function(){
                            const {totalTime} = this.diff;
                            expect(totalTime.months).toBe(5);
                            expect(totalTime.years).toBe(5);
                        });

                        it('should have a difference in monthly payment 0', function(){
                            const {monthlyPayment} = this.diff;
                            expect(monthlyPayment).toEqual(0);
                        });

                        it('should have a difference in total interest +17,922.717', function(){
                            const {totalInterest} = this.diff;
                            expect(totalInterest).toBeGreaterThan(17922.71);
                            expect(totalInterest).toBeLessThan(17922.72);
                        });
                    });
                });

                describe('when additional payments are 100 per monthly', function () {

                    beforeEach(function(){
                        this.SUT.additionalPayment = {amount: 100, frequency: 1};

                        this.mortgageDetails = this.SUT.getDetails();
                    });

                    it('should have monthly payment of 497.90', function(){
                        expect(this.mortgageDetails.monthlyPayment).toBeGreaterThan(497.89);
                        expect(this.mortgageDetails.monthlyPayment).toBeLessThan(497.91);
                    });

                    it('should have time of 20 years 11 months', function(){
                        const time = this.mortgageDetails.schedule.totalTime;
                        expect(time.months).toBe(11);
                        expect(time.years).toBe(20);
                    });

                    it('should have total interest 56,548.65', function(){
                        expect(this.mortgageDetails.schedule.totalInterest).toBeGreaterThan(56548.64);
                        expect(this.mortgageDetails.schedule.totalInterest).toBeLessThan(56548.66);
                    });

                    it('should have end date February 2021', function(){
                        const {amortizationDate} = this.mortgageDetails.schedule;
                        expect(amortizationDate.getFullYear()).toBe(2021);
                        expect(amortizationDate.getMonth()).toBe(1);
                    });

                    describe('when additional payment is reset', function () {

                        beforeEach(function(){
                            this.SUT.additionalPayment = null;
                            this.mortgageDetails = this.SUT.getDetails();
                        });

                        it('should have monthly payment of 497.90', function(){
                            expect(this.mortgageDetails.monthlyPayment).toBeGreaterThan(497.89);
                            expect(this.mortgageDetails.monthlyPayment).toBeLessThan(497.91);
                        });

                        it('should have time of 30 years 0 months', function(){
                            const time = this.mortgageDetails.schedule.totalTime;
                            expect(time.months).toBe(0);
                            expect(time.years).toBe(30);
                        });

                        it('should have total interest', function(){
                            expect(this.mortgageDetails.schedule.totalInterest).toBeGreaterThan(85963.30);
                            expect(this.mortgageDetails.schedule.totalInterest).toBeLessThan(85963.32);
                        });

                        it('should have end date March 2030', function(){
                            const {amortizationDate} = this.mortgageDetails.schedule;
                            expect(amortizationDate.getFullYear()).toBe(2030);
                            expect(amortizationDate.getMonth()).toBe(2);
                        });
                    });
                });
            });
    
        });
    });
});