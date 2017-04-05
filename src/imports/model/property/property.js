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
            downPayment = attr.downPayment || 0,
            purchasePrice = attr.purchasePrice || 0;

        delete attr.downPayment;
        delete attr.purchasePrice;

        return {
            name: '',
            purchaseDate: new Date(),

            get purchasePrice() {
                return purchasePrice;
            },

            set purchasePrice(_purchasePrice) {
                purchasePrice = parseFloat(_purchasePrice);
            },

            get downPayment() {
                return downPayment;
            },

            set downPayment(_downPayment) {
                downPayment = parseFloat(_downPayment);
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

            get totalFinancing() {
                return this.hasMortgages
                    ? mortgages.reduce((total,mortgage)=> total + mortgage.initialBalance, 0)
                    : 0;
            },

            get financingNeeded() {
                const need = purchasePrice - downPayment -  this.totalFinancing;

                return need < 0 ? 0 : need;
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