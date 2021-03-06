import {getMortgageDiff} from './helper';

export {Mortgage};

function Mortgage({getMonthlyPayment, getMortgageSchedule}) {
    if (!getMonthlyPayment) {
        throw new Error('mandatory config \'getMonthlyPayment\' missing.')
    }
    if (!getMortgageSchedule) {
        throw new Error('mandatory config \'getMortgageSchedule\' missing.')
    }

    function getModel() {
        let additionalPayment = {};

        return {
            initialBalance: 0,
            term: 0,
            interestRate: 0,
            points: 0,
            paymentFrequency: 12,
            startDate: new Date(),

            get additionalPayment() {
                return additionalPayment;
            },

            get pointsCost() {
                return this.points / 100 * this.initialBalance;
            },

            get totalCost() {
                return this.pointsCost + this.schedule.totalInterest;
            },

            get balance() {
                return this.schedule.balance;
            },

            set additionalPayment(_additionalPayment) {
                const {amount, frequency} = (_additionalPayment || {}),
                    val = {};
                
                if (amount || amount === 0) {
                    val.amount = amount
                }
                if (frequency || frequency === 0) {
                    val.frequency = frequency
                }

                additionalPayment = val;
            },

            getDetails () {
                return {
                    initialBalance: this.initialBalance,
                    points: this.points,
                    term: this.term,
                    interestRate: this.interestRate,
                    paymentFrequency: this.paymentFrequency,
                    monthlyPayment: this.monthlyPayment,
                    additionalPayment,
                    schedule: this.schedule,
                    totalCost: this.totalCost,
                    pointsCost: this.pointsCost                    
                }
            },
            
            getDiff (mortgageDetails) {
                return getMortgageDiff(this.getDetails(), mortgageDetails);
            }
        };
    }

    return {
        create (attr) {
            let schedule;

            let model = Object.assign(
                getModel(),
                attr
            );

            Object.defineProperty(model, 'monthlyPayment', {
                get: function () {
                    return getMonthlyPayment(model);
                }
            });

            Object.defineProperty(model, 'schedule', {
                get: function () {
                    return getMortgageSchedule(model);
                }
            });

            return model;
        }
    };
};