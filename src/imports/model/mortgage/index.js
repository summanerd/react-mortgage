export {MortgageFactory};


function MortgageFactory({getMonthlyPayment}) {
    if (!getMonthlyPayment) {
        throw new Error ('mandatory config \'getMonthlyPayment\' missing.')
    }
    
    const model = {
            initialBalance: 0,
            term: 0,
            interestRate: 0,
            paymentFrequency: 12,

            getDetails () {
                return {
                    initialBalance: this.initialBalance,
                    term: this.term,
                    interestRate: this.interestRate,
                    paymentFrequency: this.paymentFrequency,
                    monthlyPayment: this.monthlyPayment
                }
            }
        };

    return {
        create (attr) {

            Object.assign(
                model,
                attr
            );

            Object.defineProperty(model, 'monthlyPayment', {
                get : function () {
                    return getMonthlyPayment(model);
                }
            });
            return model;
        }
    };
};