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

        function Retention(element, settings) {

            var _this = this;

            _this.element = element;
            _this.originalOptions = settings;

            _this.defaults = {
                data : {},
                title : "Retention Analysis",
                startDate : null,
                endDate : null,
                inputDateFormat : null,
                dateDisplayFormat: null,
                cellClickEvent : function (d, i) {
                    //do something
                },
                showEmptyDataMessage : false
            };

            _this.options = this.generateOptions();

            _this.proceedFlag = Object.keys(_this.options.data).length;

            //some dom Events
            $(document).ready(function(){
                $('td.clickable').click(function () {
                    _this.options.cellClickEvent($(this).attr('date'), $(this).attr('day'));
                });

                $('[data-toggle="tooltip"]').tooltip(); //calling bootstrap tooltip
            });

            _this.init();

        }

        return Retention;

    }());

    Retention.prototype.init = function () {

        var container = this.getContainer();

        $("input[value='day']").attr("checked", ""); //default days checked

        var body = this.getBody();
        body.appendTo(container);

        if(this.proceedFlag){
            this.start(body);
        }else{
            this.end(body);
        }
    };

    Retention.prototype.end = function (body) {
        if(this.options.showEmptyDataMessage){
            $('<h3 />', {
                align : 'center',
                style : 'color:red'
            }).appendTo(body);
        }
    };

    Retention.prototype.start = function (body) {
        $(body).html('');
        var table = this.getTable();
        table.appendTo(body);
        var tableHeader = this.generateTableHeader(table);
        tableHeader.appendTo(table);

        var tbody = $('<tbody />').appendTo(table);

        var rowsData = this.getRows();

        for(var row in rowsData){
            this.generateRow(rowsData[row]).appendTo(tbody);
        }

    };

    Retention.prototype.getContainer = function () {
        var container = $('<div />', {
            class : 'box'
        }).appendTo(this.element);

        var header = $('<div />', {
            class : "box-header with-border"
        }).appendTo(container);

        var title = $('<p />', {
            class : "box-title",
            text : this.options.title
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

    Retention.prototype.generateTableHeader = function (table) {
        var tHead = $('<thead />').appendTo(table);
        var tHeadRow = $('<tr />', {
            class : "retention-thead"
        }).appendTo(tHead);

        var headerData = this.getHeaderData();
        for(var key in headerData){
            $('<td />', {
                class : "retention-cell",
                text : headerData[key]
            }).appendTo(tHeadRow);
        }
        return tHead;
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
            if(this.options.data.hasOwnProperty(keys[key])) {
                rows.push([keys[key]].concat(this.options.data[keys[key]]));
            }
        }
        return rows;
    };

    Retention.prototype.formatDate = function(date){
        return (this.options.dateDisplayFormat != null) ? (this.options.dateFormat ? moment(date, this.options.dateFormat).format(this.options.dateDisplayFormat) : moment(date).format(this.options.dateDisplayFormat)) : date;
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
                        return "background-color :" + _this.shadeColor("", _this.getPercentage(count, data[key]));
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