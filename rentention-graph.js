/**
 * Created by Araja Jyothi Babu on 22-May-16.
 */
/*
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Retention = window.Retention || {};

    Retention = (function() {

        function Retention(element, options) {

        }
        return Retention;

    }());

    $.fn.retention = function() {

    };

}));*/



function getRows(data){
    var rows = [];
    var keys = Object.keys(data);
    var days;
    var percentDays;
    for(var key in keys){
        if(data.hasOwnProperty(keys[key])) {
            days = data[keys[key]];
            percentDays.push(days[0]);
            for(var i = 1; i < days.length; i++){
                percentDays.push(Math.round(days[i] * 100) / 100);
            }
            rows.push(percentDays);
            percentDays = [];
        }
    }
    return rows;
}

var options = {
    data : {
        "22-05-2016" : [ ],
        "23-05-2016" : [ ],
        "24-05-2016" : [ ],
        "25-05-2016" : [ ]
    },
    startDate : "",
    endDate : "",
    title : "Retention Analysis"
};

$.fn.Retention = function (options) {
    var _ = this;
    var graphTitle = options.title || "Retention Graph";
    var data = options.data || null;

    var container = d3.select(this).append("div")
        .attr("class", "box");

    var header = container.append("div")
        .attr("class", "box-header with-border");
    var title = header.append("p")
        .attr("box-title")
        .text(graphTitle);
    var controls = header.append("div")
        .attr("class", "box-tools");
    var dateRange = controls.append("input")
        .attr("id", "date-range")
        .attr("type", "hidden"); //TODO: implement daterangepicker
    var switchContainer = controls.append("div")
        .attr("class", "switch-field");
    var switchData = ["days", "weeks", "months"];
    var switches = switchContainer.selectAll("span")
        .data(switchData)
        .enter()
        .append("input")
        .attr("type", "radio")
        .attr("name", "switch")
        .attr("id", function (d) {
            return d;
        })
        .attr("value", function (d) {
            return d;
        });
    var labelsForSwitches = switches.append("label")
        .attr("for", function (d) {
            return d;
        });

    var body = container.append("div")
        .attr("class", "box-body");

    var table = body.append("table")
        .attr("class", "table table-bordered");

    var headData = ["Date\\Days", "day0", "day1", "day2", "day3", "day4", "day5", "day6", "day7"];

    var tHead = table.append("thead")
        .append("tr").selectAll("td")
        .data(headData)
        .enter()
        .append("td")
        .attr("class", function (d, i) {
            if(i == 0)
                return "retention-date"
            else
                return "days"
        })
        .text(function (d) {
            return d;
        });

    var rowsData = getRows(data);

    var tBody = table.append("tbody");

    var rows = tBody.selectAll("tr")
        .data(rowsData).enter()
        .append("tr");

    var cells = rows.selectAll("td")
        .data(function (row, i) {
            return row;
        }).enter()
        .append("td")
        .attr("class", function (d, i) {
            if(i == 0)
                return "retention-date";
            else
                return "days";
        })
        .text(function (d) {
            return d;
        });

};