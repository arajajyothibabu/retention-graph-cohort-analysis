/**
 * Created by Araja Jyothi Babu on 30-May-16.
 */
var options = {
    data : {
        days : {
            "22-05-2016": [200, 10, 20, 30, 40, 10, 20, 20],
            "23-05-2016": [300, 200, 150, 50, 20, 20, 90],
            "24-05-2016": [200, 110, 150, 50, 10, 20],
            "25-05-2016": [100, 10, 10, 50, 20],
            "26-05-2016": [300, 200, 150],
            "27-05-2016": [200, 110],
            "28-05-2016": [100]
        },
        weeks : {
            "week1": [200, 10, 20, 30, 40, 10, 20, 20],
            "week2": [300, 200, 150, 50, 20, 20, 90],
            "week3": [200, 110, 150, 50, 10, 20]
        },
        months : {
            "month1": [200, 10, 20, 30, 40, 10, 20, 20],
            "month2": [300, 200, 150, 50, 20, 20, 90],
            "month3": [200, 110, 150, 50, 10, 20],
            "month4": [100, 10, 10, 50, 20]
        }
    },
    //startDate : "22-05-2016",
    //endDate : "25-05-2016",
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
    enableDateRange:true,
    showAbsolute : false,
    toggleValues : true
};