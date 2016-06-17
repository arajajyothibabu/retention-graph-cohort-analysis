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
                showEmptyDataMessage : true,
                customEmptyDataMessage : null,
                enableInactive : false,
                dayClickEvent : function(day, startDate, endDate){
                    //do something
                },
                retentionDays : 7,
                retentionWeeks : 4,
                retentionMonths : 3,
                enableTooltip : true
            };

            _this.options = _this.generateOptions();

            _this.proceedFlag = Object.keys(_this.options.data).length;

            _this.options.data = _this.sortData();

            //some dom Events
            $(document).ready(function() {
                $(document).on('click', 'td.clickable', function () {
                    _this.options.cellClickEvent($(this).attr('date'), $(this).attr('day'));
                });

                $(document).on('click', 'td.head-clickable', function () {
                    _this.options.dayClickEvent($(this).attr('day'), _this.options.startDate, _this.options.endDate);
                });

                $(document).on('mouseover mouseout', 'td.head-clickable', function () {
                    $('.col' + $(this).attr('day')).toggleClass('hover');
                });

                $(document).on('click', '#retention-active-switch', function () {
                    var body = $('.retention-body');
                    if ($(this).hasClass('retention-inactive')) {
                        _this.start(body, false);
                        $(this).addClass('retention-active btn-success').removeClass('retention-inactive btn-warning').text("Active");
                        $('.retention-title').text("Inactive User Analysis");
                    } else {
                        _this.start(body, true);
                        $(this).addClass('retention-inactive btn-warning').removeClass('retention-active btn-success').text("Inactive");
                        $('.retention-title').text("Active User Analysis");
                    }
                });

                if (this.options.enableTooltip) {
                    $("body").tooltip({
                        selector: '[data-toggle="tooltip"]'
                    });//calling bootstrap tooltip
                }
                
            });

            _this.init();

        }

        return Retention;

    }());

    Retention.prototype.init = function () {

        var container = this.getContainer();

        $("input[value='Day']").attr("checked", ""); //default days checked

        var body = this.getBody();
        body.appendTo(container);

        if(this.proceedFlag){
            this.start(body, true);
        }else{
            $('#retention-active-switch').hide();
            this.emptyMessage(body);
        }
    };

    Retention.prototype.emptyMessage = function (body) {
        if(this.options.showEmptyDataMessage){
            $('<h3 />', {
                align : 'center',
                style : 'color:red',
                text : this.options.customEmptyDataMessage ? this.options.customEmptyDataMessage : "No data available to show..!"
            }).appendTo(body);
        }
    };

    Retention.prototype.start = function (body, isActive) {
        $(body).html('');
        var table = this.getTable();
        table.appendTo(body);
        var tableHeader = this.generateTableHeader(table);
        tableHeader.appendTo(table);

        var tbody = $('<tbody />').appendTo(table);

        var rowsData = this.getRows();

        for(var row in rowsData){
            this.generateRow(rowsData[row], isActive).appendTo(tbody);
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
            class : "retention-title box-title",
            text : this.options.title
        }).appendTo(header);

        var controls = $('<div />', {
            class : "box-tools"
        }).appendTo(header);

        if(this.options.enableInactive) {
            var retentionSwitch = this.getInactiveSwitch();
            retentionSwitch.appendTo(controls);
        }

        var dateRange = $('<input />',{
            id : "date-range",
            type : "hidden"
        }).appendTo(controls); //TODO: implement daterangepicker

        var switchContainer = $('<a />', {
            class : "switch-field"
        }).appendTo(controls);

        var switchData = ["Day", "Week", "Month"];

        for(var key in switchData){
            $('<input />', {
                type : "radio",
                name : "retention-switch",
                id : switchData[key],
                value : switchData[key],
                disabled : ""
            }).appendTo(switchContainer);
            $('<label />', {
                for : switchData[key],
                style : "cursor:not-allowed",
                title : "Feature yet to implement",
                text : switchData[key] + "s" //appending s for "days"
            }).appendTo(switchContainer);
        }
        return container;
    };

    Retention.prototype.getInactiveSwitch = function () {
        var _this = this, body;
        var switchInput = $('<a />', {
            type : 'button',
            id : 'retention-active-switch',
            class : 'retention-inactive btn btn-warning',
            text : 'Inactive',
            style : 'margin: 0px 5px; width: 80px;'
        });
        return switchInput;
    };

    Retention.prototype.getBody = function () {
        var body = $('<div />', {
            class : "retention-body box-body"
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
                class : function(){
                    return key > 1 ? "retention-cell head-clickable" : "retention-cell";
                },
                day : key-1,
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

    Retention.prototype.sortData = function () {
        const ordered = {};
        var _this = this;
        Object.keys(this.options.data).sort().forEach(function(key) {
            ordered[key] = _this.options.data[key];
        });
        return ordered;
    };

    Retention.prototype.getRows = function(){
        var rows = [];
        var keys = Object.keys(this.options.data);
        this.options.startDate = keys[0];
        this.options.endDate = keys[keys.length-1];
        for(var key in keys){
            if(this.options.data.hasOwnProperty(keys[key])) {
                rows.push([keys[key]].concat(this.options.data[keys[key]]));
            }
        }
        return rows;
    };

    Retention.prototype.formatDate = function(date){
        return (this.options.dateDisplayFormat != null) ? (this.options.inputDateFormat ? moment(date, this.options.inputDateFormat).format(this.options.dateDisplayFormat) : moment(date).format(this.options.dateDisplayFormat)) : date;
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

    Retention.prototype.tooltipData = function(date, total, count, dayIndex, isActive){
        var fromDate = this.formatDate(date);//.format("MMM DD");
        var toDate =  moment(this.formatDate(date), this.options.dateDisplayFormat).add(dayIndex-1, "days").format(this.options.dateDisplayFormat);
        var active = isActive? " active " : " inactive ";
        return  "Of " + total + " users came on " + fromDate + ", " + (count + " were " + active + " on " + toDate);
    };

    Retention.prototype.getHeaderData = function(){
        var headerDataAppender = $("input[name='retention-switch']:checked").val(); //changes by selection of switch
        var headerData = [];
        for(var i = 0; i < 9; i++){
            headerData.push(i > 0? (headerDataAppender + "-" + (i-1)) : ("Date \\ " + headerDataAppender + "s"));
        }
        return headerData;
    };

    Retention.prototype.generateRow = function(data, isActive){
        var _this = this;
        var row = $('<tr />');
        var date = data[0];
        var dayCount = 0;
        var count = data[1] || 1; //to handle divisionBy0
        var td, div;
        for(var key in data){
            var className = (key > 0 ? "retention-cell" + (key > 1 ? " clickable" : "") : "retention-date") + (" col" + (key-1));
            td = $('<td />', {
                class : className,
                style : function () {
                    if(key > 1) {
                        dayCount = isActive? data[key] : count-data[key];
                        return "background-color :" + _this.shadeColor("", _this.getPercentage(count, dayCount));
                    }
                },
                date : date,
                day : key-1
            }).appendTo(row);
            div = $('<div />', {
                'data-toggle' : "tooltip",
                title : function () {
                    if(key > 1) {
                        dayCount = isActive? data[key] : count-data[key];
                        return _this.tooltipData(date, count, dayCount, key, isActive);
                    }
                },
                text : function () {
                    return key > 1 ? (_this.getPercentage(count, isActive? data[key] : count-data[key]) + "%" ) : (key == 0 ? _this.formatDate(data[key]) : data[key]);
                }
            }).appendTo(td);
        }
        return row;
    };

    $.fn.retention = function(options) {
        if(typeof options == 'object'){
            new Retention(this, options);
        }else{
            throw new Error("Need options to show retention graph..!");
        }
    };

}));