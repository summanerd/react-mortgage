
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
    "November", "December"];

export default {formatShortDate, formatMoney, formatPercent};

function formatShortDate(val) {
    if ( !val ) {
        return '--';
    }
    // var sign = window.userLanguage === 'en-US' ? '$' : '',
    const month = val.getMonth(),
        day = val.getDate(),
        year = val.getFullYear();

    return `${monthNames[month].substring(0,3)} ${day}, ${year}`;
}

function formatMoney(val) {
    if ( !val ) {
        return '--';
    }
    // var sign = window.userLanguage === 'en-US' ? '$' : '',
    var sign = '',
        val = parseFloat(val),
        isNegative = val < 0,
        money = (parseFloat( val )).toFixed(2).replace(/^\-/, '').split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );

    return isNegative ? '(' + sign + money + ')' : sign + money;
}

function formatPercent(val) {
    if ( !val ) {
        return '--';
    }
    // var sign = window.userLanguage === 'en-US' ? '$' : '',
    var sign = '',
        val = parseFloat(val),
        isNegative = val < 0,
        money = (parseFloat( val * 100 )).toFixed(2).replace(/^\-/, '').split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," );

    return isNegative ? '(' + sign + money + ')' : sign + money;
}