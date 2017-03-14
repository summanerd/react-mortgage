import {getMortgageDiff} from './helper';

export {MortgageFactory};

function MortgageFactory({getMonthlyPayment, getMortgageSchedule}) {
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
            paymentFrequency: 12,
            startDate: new Date(),

            get additionalPayment() {
                return additionalPayment;
            },

            set additionalPayment(_additionalPayment) {
                const {amount = 0, frequency = 0} = (_additionalPayment || {});
                additionalPayment = {amount, frequency};
            },

            getDetails () {
                return {
                    initialBalance: this.initialBalance,
                    term: this.term,
                    interestRate: this.interestRate,
                    paymentFrequency: this.paymentFrequency,
                    monthlyPayment: this.monthlyPayment,
                    additionalPayment,
                    schedule: this.schedule
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