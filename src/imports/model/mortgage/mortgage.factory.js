import {Mortgage} from './mortgage';
import {getMonthlyPayment, getMortgageSchedule} from './helper';

const FixedMortgage = Mortgage({getMonthlyPayment, getMortgageSchedule});

export {FixedMortgage};