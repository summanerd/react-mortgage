import {mortgage} from '../import';

const {Mortgage} = mortgage;

describe('Model', function () {
    describe('Mortgage', function () {
        describe('Factory', function () {
    
            describe('getMonthlyPayment functionality is not provided', function () {

                beforeEach(function(){
                    this.SUT = function () {
                        return Mortgage({getMortgageSchedule: {}})
                    };
                });
    
                it('should throw an error', function(){
                    expect(this.SUT).toThrowError('mandatory config \'getMonthlyPayment\' missing.');
                });
            });

            describe('getMortgageSchedule functionality is not provided', function () {

                beforeEach(function(){
                    this.SUT = function () {
                        return Mortgage({getMonthlyPayment: {}})
                    };
                });

                it('should throw an error', function(){
                    expect(this.SUT).toThrowError('mandatory config \'getMortgageSchedule\' missing.');
                });
            });
    
        });
    });
});