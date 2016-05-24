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
    var days = [];
    var percentDays = [];
    for(var key in keys){
        if(data.hasOwnProperty(keys[key])) {
            days = data[keys[key]];
            percentDays.push(keys[key]);
            for(var i = 0; i < days.length; i++){
                percentDays.push(i > 0 ? Math.round((days[i]/days[0] * 100) * 100) / 100 : days[i]);
            }
            rows.push(percentDays);
            percentDays = [];
        }
    }
    return rows;
}

function isValidHex(color){
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
}

function shadeColor(color, percent) { //#
    color = isValidHex(color) ? color : "#3f83a3"; //handling null color;
    percent = 1.0 - Math.ceil(percent / 10) / 10;
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function tooltipData(date, total, count, dayIndex){
    return  "Of " + total + " users came on " + moment(date, "DD-MM-YYYY").format("MMM DD") + ", " + (count + "% were active on " + moment(date, "DD-MM-YYYY").add(dayIndex-1, "days").format("MMM DD"));
}

function getHeaderData(){
    var headerDataAppender = $("input:checked").val(); //changes by selection of switch
    var headerData = [];
    for(var i = 0; i < 9; i++){
        if(i == 0)
            headerData.push("Date \\ " + headerDataAppender + "s");
        else
            headerData.push(headerDataAppender + (i-1));
    }
    return headerData;
}

function generateRow(data){
    var row = $('<tr />');
    var date = data[0];
    var count = data[1] || 1;
    var td, div;
    for(var key in data){
        var className = key > 0 ? "retention-cell" : "retention-date";
        td = $('<td />', {
            class : className,
            style : function () {
                if(key > 1)
                    return "background-color :" + shadeColor("", data[key]);
            }
        }).appendTo(row);
        div = $('<div />', {
            'data-toggle' : "tooltip",
            title : function () {
                if(key > 1 && data[key] != 0)
                    return  tooltipData(date, count, data[key], key);
            },
            text : function () {
                return data[key] + (key > 1 ? "%" : "");
            }
        }).appendTo(td);
    }
    return row;
}

var options = {
    data : {
        "22-05-2016" : [200, 10, 20, 30, 40, 10, 20, 20],
        "23-05-2016" : [300, 200, 150, 50, 20, 20, 90, 100 ],
        "24-05-2016" : [200, 110, 150, 50, 10, 20, 30, 40],
        "25-05-2016" : [100, 10, 10, 50, 20, 20, 60, 0]
    },
    startDate : "",
    endDate : "",
    dateFormat : "",
    title : "Retention Analysis"
};

$.fn.Retention = function (options) {

    var graphTitle = options.title || "Retention Graph";
    var data = options.data || null;
    if(data == null)
        return;

    var container = $('<div />', {
        class : 'box'
    }).appendTo(this);

    var header = $('<div />', {
        class : "box-header with-border"
    }).appendTo(container);

    var title = $('<p />', {
        class : "box-title",
        text : graphTitle
    }).appendTo(header);

    var controls = $('<div />', {
        class : "box-tools"
    }).appendTo(header);

    var dateRange = $('<input />',{
        id : "date-range",
        type : "hidden"
    }).appendTo(controls); //TODO: implement daterangepicker

    var switchContainer = $('<div />', {
        class : "switch-field"
    }).appendTo(controls);

    var switchData = ["day", "week", "month"];

    for(var key in switchData){
        $('<input />', {
            type : "radio",
            name : "retention-switch",
            id : switchData[key],
            value : switchData[key]
        }).appendTo(switchContainer);
        $('<label />', {
            for : switchData[key],
            text : switchData[key] + "s" //appending s for "days"
        }).appendTo(switchContainer);
    }

    $("input[value='day']").attr("checked", ""); //default days checked

    var body = $('<div />', {
        class : "box-body"
    }).appendTo(container);

    var table = $('<table />', {
        class : "table table-bordered text-center"
    }).appendTo(body);

    var thead = $('<thead />').appendTo(table);
    var tHeadRow = $('<tr />', {
        class : "retention-thead"
    }).appendTo(thead);

    var headerData = getHeaderData();
    for(var key in headerData){
        $('<td />', {
            class : "retention-cell",
            text : headerData[key]
        }).appendTo(tHeadRow);
    }

    var tbody = $('<tbody />').appendTo(table);

    var rowsData = getRows(data);

    for(var row in rowsData){
        generateRow(rowsData[row]).appendTo(tbody);
    }

    $('[data-toggle="tooltip"]').tooltip(); //calling bootstrap tooltip

};