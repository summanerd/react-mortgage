export{getMonthlyPayment, getMortgageSchedule};

function getMortgageSchedule(mortgage) {

    let {initialBalance, term, payment_frequency, interest_rate} = mortgage;

    mortgage_data = Object.assign({
        additional_payment: {
            amount: 0,
            frequency: 0
        }
    }, {initialBalance, term, payment_frequency, interest_rate}, mortgage_data);

    additional_payment = mortgage_data.additional_payment;
    payments = mortgage_data.payments;
    initialBalance = mortgage_data.initial_balance;
    start_date = mortgage_data.start_date;
    term = mortgage_data.payback_period;
    payment_frequency = mortgage_data.payment_frequency;
    interest_rate = mortgage_data.interest_rate;

    monthly_payment = this.getMonthlyPayment({
        initial_balance: initialBalance,
        payback_period: term,
        payment_frequency: payment_frequency,
        interest_rate: interest_rate
    });
    if (!this.get('actual')) {
        additional_payment = payments = null;
    }
    balance = initialBalance;
    startDate = start_date.getTime();
    currentDate = new Date;
    periods = parseInt(term, 10) * 12;
    monthlyRate = (interest_rate / 100) / payment_frequency;
    i = 0;
    schedule = new app.Collections.Mortgage.Schedule;
    totalInterest = 0;
    additional_payment_amt = additional_payment && additional_payment.amount ? parseFloat(additional_payment.amount) : 0;
    additional_payment_freq = additional_payment_amt ? additional_payment.frequency || 1 : 0;
    amortDate = new Date(startDate);
    while (i < periods && balance > 0) {
        date = amortDate.getFullMonth(true) + ' ' + amortDate.getFullYear();
        if (payments && payments.length) {
            payment = payments.findWhere({
                date: date
            });
        }
        interest = balance * monthlyRate;
        totalInterest += interest;
        principal = monthly_payment - interest;
        if (payment) {
            principal += payment.get('additional_payment');
        } else if (additional_payment_freq && ((i + 1) % additional_payment_freq) === 0) {
            principal += additional_payment_amt;
        }
        balance -= principal;
        balance = balance < 0 ? 0 : balance;
        amort = {
            date: date,
            real_date: amortDate,
            interest: interest,
            total_interest: totalInterest,
            principal: principal,
            balance: balance,
            additional_payment: (principal + interest) - monthly_payment,
            id: i + 1
        };
        schedule.add(amort);
        amortDate = new Date(amortDate.setMonth(amortDate.getMonth() + 1, amortDate.getDate()));
        i++;
    }
    end_date = AmortizationModel.getEndDate({
        start_date: start_date,
        total_months: i
    });
    amortizationHasNotStarted = startDate > currentDate.getTime();
    amortizationHasEnded = end_date.getTime() < currentDate.getTime();
    if (amortizationHasNotStarted) {
        current_balance = initialBalance;
        interest_paid = 0;
    } else if (amortizationHasEnded) {
        current_balance = 0;
        interest_paid = totalInterest;
        current_amort = schedule.last();
    } else {
        currentDate = "" + (currentDate.getFullMonth(true)) + " " + (currentDate.getFullYear());
        current_schedule = schedule.findWhere({
            date: currentDate
        });
        interest_paid = current_schedule.get('total_interest');
        current_balance = current_schedule.get('balance');
    }
    return {
        initial_balance: initialBalance,
        total_interest: totalInterest,
        payment: monthly_payment,
        time: getTime(i),
        end_date: end_date,
        start_date: start_date,
        schedule: schedule,
        current_balance: current_balance,
        interest_paid: interest_paid,
        current_schedule: current_schedule
    };
};

function getTime(totalMonths) {
    var months, years;
    years = parseInt(totalMonths / 12, 10);
    months = totalMonths - (years * 12);
    return {
        years: years,
        months: months
    };
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
};
