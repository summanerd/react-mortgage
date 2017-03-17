import {MortgageScheduleFactory} from './schedule/schedule.collection';
import {dateHelper} from '../../helpers';

export{getMonthlyPayment, getMortgageSchedule, getMortgageDiff};

const MortgageSchedule = MortgageScheduleFactory();

function getMortgageSchedule(mortgage) {

    let {initialBalance, additionalPayment, term, paymentFrequency, interestRate, startDate, monthlyPayment} = mortgage;
    const {amount: additionalPaymentAmt = 0, frequency: additionalPaymentFreq = 0} = additionalPayment;

    let periods = getTotalPeriods(term, paymentFrequency),
        ratePerPeriod = getRatePerPeriod(interestRate, paymentFrequency);
    
    let i = 0,
        schedule = MortgageSchedule.create({initialBalance, startDate}),
        amortDate = new Date(startDate);
    
    while (i < periods && schedule.balance > 0) {
        const dateKey = getDateKey(amortDate),
            interest = schedule.balance * ratePerPeriod;

        let _additionalPayment = 0,
            principal = monthlyPayment - interest;
        
        if (additionalPaymentFreq && ((i + 1) % additionalPaymentFreq) === 0) {
            _additionalPayment = additionalPaymentAmt;
        }
        
        schedule.add({
            dateKey,
            date: amortDate,
            interest,
            principal,
            additionalPayment: _additionalPayment
        });
        
        amortDate = new Date(amortDate.setMonth(amortDate.getMonth() + 1, amortDate.getDate()));
        i++;
    }
    
    return schedule;
}

function getDateKey(date) {
    return [dateHelper.getFullMonth(date, true), date.getFullYear()].join('-')    
}

function getRatePerPeriod(interestRate, paymentFrequency) {
    return (interestRate / 100) / paymentFrequency;
}

function getTotalPeriods(term, paymentFrequency) {
    return term * paymentFrequency;
}

function getMonthlyPayment(mortgage) {
    let {initialBalance, term, paymentFrequency, interestRate} = mortgage;

    if (!initialBalance) {
        return 0;
    }

    const periods = parseInt(term, 10) * 12,
        monthlyRate = (interestRate / 100) / paymentFrequency,
        monthlyPayment = (monthlyRate / (1 - (Math.pow(1 + monthlyRate, -periods)))) * initialBalance;

    return monthlyPayment;
}

function getMortgageDiff(mortgageDetailsA, mortgageDetailsB) {
    const {schedule: scheduleA} = mortgageDetailsA;
    const {schedule: scheduleB} = mortgageDetailsB;

    const totalTime = getTimeFromMonths(convertTimeToMonths(scheduleA.totalTime) - convertTimeToMonths(scheduleB.totalTime));

    return{
        totalInterest: scheduleA.totalInterest - scheduleB.totalInterest,
        totalTime,
        monthlyPayment: mortgageDetailsA.monthlyPayment - mortgageDetailsB.monthlyPayment
    }
}

function convertTimeToMonths(time) {
    return time.years * 12 + time.months;
}

function getTimeFromMonths(totalMonths) {
    var months, years;
    years = parseInt(totalMonths / 12);
    months = totalMonths - (years * 12);
    return {
        years: years,
        months: months
    };
}