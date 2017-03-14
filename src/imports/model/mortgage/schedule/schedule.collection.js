import {MortgageScheduleModelFactory} from './schedule.model';
export {MortgageScheduleFactory};

function MortgageScheduleFactory() {

    const MortgageScheduleModel = MortgageScheduleModelFactory();

    function getModel({initialBalance, startDate}) {

        let collection = [],
            balance = initialBalance,
            totalInterest = 0;

        let model = {
            amortizationDate: startDate,

            add (attr) {
                let schedule = MortgageScheduleModel.create(attr);
                collection.push(schedule);

                totalInterest += schedule.interest;
                balance -= schedule.principal + schedule.additionalPayment;
                this.amortizationDate = schedule.date;

                schedule.id = collection.length + 1;
                schedule.totalInterest = totalInterest;
                schedule.balance = balance;

                return schedule;
            },

            get startDate() {
                return startDate;
            },

            get totalInterest() {
                return totalInterest;
            },

            get balance() {
                return balance;
            },

            get totalTime() {
                return getTotalTime(this);
            }
        };

        return model;
    }

    return {
        create ({initialBalance, startDate}) {

            return getModel({initialBalance, startDate});
        }
    };
};


function getTotalTime({startDate, amortizationDate}) {
    let startMonths = startDate.getFullYear() * 12 + startDate.getMonth();
    let endMonths = amortizationDate.getFullYear() * 12 + amortizationDate.getMonth();
    let totalMonths = endMonths - startMonths;

    return getTime(totalMonths);
}

function getTime(totalMonths) {
    var months, years;
    years = parseInt(totalMonths / 12, 10);
    months = totalMonths - (years * 12);
    return {
        years: years,
        months: months
    };
}