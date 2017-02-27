export {getFullMonth};

function getFullMonth(date, abbreviate = false) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (abbreviate) {
        return months[date.getMonth()].substring(0, 3);
    }
    return months[date.getMonth()];
}