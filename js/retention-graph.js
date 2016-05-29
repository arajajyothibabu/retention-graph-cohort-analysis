/**
 * Created by Araja Jyothi Babu on 22-May-16.
 */

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

        var instanceId = 0;

        function Retention(element, settings) {

            var _this = this;

            _this.element = element;
            _this.originalOptions = settings;

            _this.defaults = {
                data : {},
                startDate : null,
                endDate : null,
                inputDateFormat : null,
                dateDisplayFormat: null,
                cellClickEvent : function (d, i) {
                    //do something
                }
            };

            _this.options = this.generateOptions();

            _this.proceedFlag = Object.keys(_this.options.data).length;

            _this.init();

        }

        return Retention;

    }());

    Retention.prototype.init = function () {
        if(this.proceedFlag){
            //TODO
        }else{
            //TODO
        }
    };

    Retention.prototype.getContainer = function () {
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
        return container;
    };

    Retention.prototype.getBody = function () {
        var body = $('<div />', {
            class : "box-body"
        });
        return body;
    };

    Retention.prototype.getTable = function () {
        var table = $('<table />', {
            class : "table table-bordered text-center"
        });
        return table;
    };

    Retention.prototype.generateOptions = function () {
        var options = {};
        var keys = Object.keys(this.defaults);
        var key;
        for(var i in keys){
            key = keys[i];
            options[key] = typeof this.originalOptions[key] == 'undefined' ? this.defaults[key] : this.originalOptions[key];
        }
        return options;
    };

    Retention.prototype.getRows = function(){
        var rows = [];
        var keys = Object.keys(this.options.data);
        for(var key in keys){
            if(data.hasOwnProperty(keys[key])) {
                rows.push([keys[key]].concat(data[keys[key]]));
            }
        }
        return rows;
    };

    Retention.prototype.formatDate = function(date){
        var formattedDate = (this.options.dateDisplayFormat != null) ? (this.options.dateFormat ? moment(date, this.options.dateFormat).format(this.options.dateDisplayFormat) : moment(date).format(this.options.dateDisplayFormat)) : date;
        return formattedDate;
    };

    Retention.prototype.getPercentage = function (total, value) {
        return Math.round((value/total * 100) * 100) / 100;
    };

    Retention.prototype.isValidHex = function(color){
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    };

    Retention.prototype.shadeColor = function(color, percent) { //#
        color = this.isValidHex(color) ? color : "#3f83a3"; //handling null color;
        percent = 1.0 - Math.ceil(percent / 10) / 10;
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    };

    Retention.prototype.tooltipData = function(date, total, count, dayIndex){
        return  "Of " + total + " users came on " + moment(date).format("MMM DD") + ", " + (count + " were active on " + moment(date).add(dayIndex-1, "days").format("MMM DD"));
    };

    Retention.prototype.getHeaderData = function(){
        var headerDataAppender = $("input[name='retention-switch']:checked").val(); //changes by selection of switch
        var headerData = [];
        for(var i = 0; i < 9; i++){
            headerData.push(i > 0? (headerDataAppender + (i-1)) : ("Date \\ " + headerDataAppender + "s"));
        }
        return headerData;
    };

    Retention.prototype.generateRow = function(data){
        var _this = this;
        var row = $('<tr />');
        var date = data[0];
        var count = data[1] || 1; //to handle divisionBy0
        var td, div;
        for(var key in data){
            var className = key > 0 ? "retention-cell" + (key > 1 ? " clickable" : "") : "retention-date";
            td = $('<td />', {
                class : className,
                style : function () {
                    if(key > 1)
                        return "background-color :" + _this.shadeColor("", data[key]);
                },
                date : date,
                day : key-1
            }).appendTo(row);
            div = $('<div />', {
                'data-toggle' : "tooltip",
                title : function () {
                    if(key > 1 && data[key] != 0)
                        return  _this.tooltipData(date, count, data[key], key);
                },
                text : function () {
                    return key > 1 ? (_this.getPercentage(count, data[key]) + "%" ) : data[key];
                }
            }).appendTo(td);
        }
        return row;
    };

    $.fn.retention = function(options) {
        if(typeof options == 'object'){
            new Retention(this, options);
        }else{
            throw new Error("Need data to show retention graph..!");
        }
    };

}));



function getRows(data, dateFormat, dateDisplayFormat){
    var rows = [];
    var keys = Object.keys(data);
    var days = [];
    var percentDays = [];
    var date;
    for(var key in keys){
        if(data.hasOwnProperty(keys[key])) {
            days = data[keys[key]];
            date = (dateDisplayFormat != null) ? (dateFormat ? moment(keys[key], dateFormat).format(dateDisplayFormat) : moment(keys[key]).format(dateDisplayFormat)) : keys[key];
            //console.log(moment(keys[key], dateFormat).format(dateDisplayFormat), moment(keys[key]).format(dateDisplayFormat));
            percentDays.push(date);
            for(var i = 0; i < days.length; i++){
                percentDays.push(i > 0 ? Math.round((days[i]/days[0] * 100) * 100) / 100 : days[i]);
            }
            rows.push(percentDays);
            percentDays = [];
        }
    }
    return rows;
}

function shadeColor(color, percent) { //#
    color = isValidHex(color) ? color : "#3f83a3"; //handling null color;
    percent = 1.0 - Math.ceil(percent / 10) / 10;
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function tooltipData(date, total, count, dayIndex){
    return  "Of " + total + " users came on " + moment(date).format("MMM DD") + ", " + (count + "% were active on " + moment(date).add(dayIndex-1, "days").format("MMM DD"));
}

function getHeaderData(){
    var headerDataAppender = $("input[name='retention-switch']:checked").val(); //changes by selection of switch
    var headerData = [];
    for(var i = 0; i < 9; i++){
        if(i == 0)
            headerData.push("Date \\ " + headerDataAppender + "s");
        else
            headerData.push(headerDataAppender + (i-1));
    }
    return headerData;
}

function generateRow(data, cellClickEvent){
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
                    return "cursor: pointer; background-color :" + shadeColor("", data[key]);
            },
        }).click(function (){
            cellClickEvent != null ? cellClickEvent(date, 1) : null
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
    startDate : "22-05-2016",
    endDate : "5-05-2016",
    dateFormat : "DD-MM-YYYY", //if not iso date given
    dateDisplayFormat : "MMM DD YYYY",
    title : "Retention Analysis",
    cellClickEvent : function(date, day){
        window.location = "https://www.google.com?date=" + date + "$day="+ day;
    }
};

$.fn.Retention = function (options) {

    var graphTitle = options.title || "Retention Graph";
    var data = options.data || null;
    var dateFormat = options.dateFormat || null;
    var dateDisplayFormat = options.dateDisplayFormat || null;
    var cellClickEvent = typeof options.cellClickEvent == 'function' ? options.cellClickEvent : null;
    if(data == null || Object.keys(data).length == 0)
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

    var rowsData = getRows(data, dateFormat, dateDisplayFormat);

    for(var row in rowsData){
        generateRow(rowsData[row], cellClickEvent).appendTo(tbody);
    }

    $('[data-toggle="tooltip"]').tooltip(); //calling bootstrap tooltip

};