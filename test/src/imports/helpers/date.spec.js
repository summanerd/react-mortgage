import {dateHelper} from './import';

describe('Helpers', function () {
    describe('Date Helper', function () {

        describe('#getFullMonth', function () {
            describe('when abbreviation is not provided', function () {

                it('should not abbreviate month', function(){
                    expect(dateHelper.getFullMonth(new Date(2000, 2))).toBe('March');
                });
            });
            describe('when abbreviation is provided', function () {

                it('should abbreviate month', function(){
                    expect(dateHelper.getFullMonth(new Date(2000, 2), true)).toBe('Mar');
                });
            });
        });

    });
});