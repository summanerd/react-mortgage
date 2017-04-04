export default function Property() {

    return {
        create (attr) {

            let model = getModel(attr);

            return model;
        }
    };

    function getModel(attr = {}) {
        let mortgages = [],
            valueByDate = [],
            downPayment = 0;

        return {
            name: '',
            purchasePrice: 0,
            purchaseDate: new Date(),

            get downPayment() {
                return downPayment;
            },

            set downPayment(_downPayment) {
                downPayment = _downPayment;
            },

            get downPaymentPercent() {
                return downPayment / this.purchasePrice;
            },

            get mortgages() {
                return mortgages;
            },

            get valueByDate() {
                return valueByDate;
            },

            get equity() {
                return this.homeValue - this.totalLiabilities;
            },

            get homeValue() {
                return this.hasAppraisals ? valueByDate[valueByDate.length - 1].homeValue : 0;
            },

            get totalLiabilities() {
                return mortgages.reduce((balance, mortgage)=> balance + mortgage.balance, 0);
            },

            get hasAppraisals() {
                return !!valueByDate.length;
            },

            get hasMortgages() {
                return !!mortgages.length;
            },

            setDownPaymentByPercent(percent){
                downPayment = percent * this.purchasePrice;
            },

            addValue(homeValue){
                if (!homeValue.date) {
                    homeValue.date = new Date;
                }
                this.valueByDate.push(homeValue);
            },

            addMortgage(mortgage){
                mortgage.id = this.hasMortgages ? mortgages[mortgages.length - 1].id + 1 : 1;
                mortgages.push(mortgage);
            },
            ...attr
        };
    }
};