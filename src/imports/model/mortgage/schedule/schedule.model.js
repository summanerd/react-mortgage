export {MortgageScheduleModelFactory};


function MortgageScheduleModelFactory() {
    
    function getModel() {
        return {
            date: null,
            dateKey: null,
            principal: 0,
            interest: 0,
            totalInterest: 0,
            hoa: 0,
            insurance: 0,
            balance: 0
        };
    }

    return {
        create (attr) {

            var model = Object.assign(
                getModel(),
                attr
            );

            Object.defineProperty(model, 'total', {
                get : function () {
                    const {principal, interest, hoa, insurance} = model;
                    
                    return principal + interest + hoa + insurance;
                }
            });
            return model;
        }
    };
};