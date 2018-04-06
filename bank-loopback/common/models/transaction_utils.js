var checkCurrentTimeInRange = function(startTime, endTime, now){
    
    var startDate = dateObj(startTime);
    var endDate = dateObj(endTime);
    if(!now){
        now = new Date();
    }
    function dateObj(d) {
        var parts = d.split(/:|\s/),
            date = new Date();
        if (parts.pop().toLowerCase() == 'pm') parts[0] = (+parts[0]) + 12;
        date.setHours(+parts.shift());
        date.setMinutes(+parts.shift());
        date.setSeconds('00','00');
        return date;
    }
    return  now < endDate && now > startDate;
}

module.exports = {
    startTime : '9:00 AM',
    endTime : '9:00 PM',
    checkCurrentTimeInRange : checkCurrentTimeInRange
}
