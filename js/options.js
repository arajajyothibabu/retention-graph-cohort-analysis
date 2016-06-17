/**
 * Created by Araja Jyothi Babu on 30-May-16.
 */
var options = {
    data : {
        days : {
            "22-05-2016": [200, 10, 20, 30, 40, 10, 20, 20],
            "23-05-2016": [300, 200, 150, 50, 20, 20, 90, 100],
            "24-05-2016": [200, 110, 150, 50, 10, 20, 30, 40],
            "25-05-2016": [100, 10, 10, 50, 20, 20, 60, 0]
        },
        weeks : {
            "week1": [200, 10, 20, 30, 40, 10, 20, 20],
            "week2": [300, 200, 150, 50, 20, 20, 90, 100],
            "week3": [200, 110, 150, 50, 10, 20, 30, 40]
        },
        months : {
            "month1": [200, 10, 20, 30, 40, 10, 20, 20],
            "month2": [300, 200, 150, 50, 20, 20, 90, 100],
            "month3": [200, 110, 150, 50, 10, 20, 30, 40],
            "month4": [100, 10, 10, 50, 20, 20, 60, 0]
        }
    },
    startDate : "22-05-2016",
    endDate : "5-05-2016",
    inputDateFormat : "DD-MM-YYYY", //if not iso date given
    dateDisplayFormat : "MMM DD YYYY",
    title : "Retention Analysis",
    cellClickEvent : function(date, day){
        alert("date=" + date + "&day="+ day);
    },
    enableInactive: true,
    dayClickEvent : function(day, startDate, endDate){
        alert(day + "start" + startDate + "end" + endDate);
    },
};