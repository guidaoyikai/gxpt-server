function dateFormat(date) {
    console.log(showTime(date.getHours()));
    var year = date.getFullYear();                // 年
    var month = showTime(date.getMonth() + 1);        // 月
    var day = showTime(date.getDate()); 
    var hours = showTime(date.getHours());        
    var minutes = showTime(date.getMinutes());          
    var str = '';
    str = str + year + '/' + month +  '/' + day + '  ' + hours + ':' + minutes
    return str
}

function showTime(t) {
    var time
    time = t > 10 ? t : '0' + t
    return time
}

module.exports = dateFormat