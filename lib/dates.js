module.exports = {
  getMonth: function(yearString) {
    if(yearString === "Jan")
      return 1;
    else if(yearString === "Feb")
      return 2;
    else if(yearString === "Mar")
      return 3;
    else if(yearString === "Apr")
      return 4;
    else if(yearString === "May")
      return 5;
    else if(yearString === "Jun")
      return 6;
    else if(yearString === "Jul")
      return 7;
    else if(yearString === "Aug")
      return 8;
    else if(yearString === "Sep")
      return 9;
    else if(yearString === "Oct")
      return 10;
    else if(yearString === "Nov")
      return 11;
    else
      return 12;
  },

  starts: function(meetups) {
    var dates = [];

    for (var i = 0; i < meetups.length; i++) {
      date = new Date(meetups[i]["time"]);
      var dateString = date.toString().split(' ');
      var month = module.exports.getMonth(dateString[1]).toString();
      var day = dateString[2];
      var year = dateString[3];
      var time = dateString[4];
      if(time > 12)
        time -= 12;
      dates.push(month + '/' + day + '/' + year + ' ' + time);
    }

    return dates;
  },

  ends: function(meetups) {
    var dates = [];

    for (var i = 0; i < meetups.length; i++) {
      if(meetups[i]["duration"]) {
        date = new Date(meetups[i]["time"] + meetups[i]["duration"]);
        var dateString = date.toString().split(' ');
        var month = module.exports.getMonth(dateString[1]).toString();
        var day = dateString[2];
        var year = dateString[3];
        var time = dateString[4];
        console.log(time.split(':')[0]);
        dates.push(month + '/' + day + '/' + year + ' ' + time);
      }
      else
        dates.push("Not provided");
    }

    return dates;
  }
}
