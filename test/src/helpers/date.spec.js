import {dateHelper} from './import';
// const {dateHelper} = helpers;

// console.log(JSON.stringify(helpers))
describe('Helpers', function () {
    describe('Date Helper', function () {

        describe('#getFullMonth', function () {
            describe('when abbreviation is not provided', function () {

                it('should not abbreviate month', function(){
                    expect(dateHelper.getFullMonth(new Date(2000, 2))).toBe('March');
                });
            });
        });

    });
});