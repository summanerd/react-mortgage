import {format} from './import';
const {formatShortDate, formatMoney} = format;

// console.log(JSON.stringify(helpers))
describe('Helpers', function () {
    describe('Format Helper', function () {

        describe('#formatShortDate', function () {
            describe('when NO date is provided', function () {

                it('should return dash', function(){
                    expect(formatShortDate()).toBe('--');
                });
            });

            describe('when date is provided', function () {

                it('should return date with shortened mont', function(){
                    expect(formatShortDate(new Date(2000, 2, 30))).toBe('Mar 30, 2000');
                });
            });
        });

        describe('#formatMoney', function () {
            describe('when NO value is provided', function () {

                it('should return dash', function(){
                    expect(formatMoney()).toBe('--');
                });
            });

            describe('when value is provided', function () {

                it('should return comma separated format', function(){
                    expect(formatMoney(34563)).toBe('34,563.00');
                });
            });

            describe('when value is negate', function () {

                it('should return number in parentheses', function(){
                    expect(formatMoney(-34563)).toBe('(34,563.00)');
                });
            });
        });

    });
});