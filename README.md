# Retention graph (Cohort analysis)
Retention graph (Cohort Analysis) using Bootstrap ```(v0.1.7)```

#### [Live Demo](http://arajajyothibabu.github.io/retention-graph-Cohort-analysis/)

![alt tag](http://i.imgur.com/uJQTG1Q.png)

### Dependencies:
##### 1. Bootstrap
##### 2. Moment.js
##### 3. DateRangePicker

### Input options:
```
{
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
    endDate : "25-05-2016",
    inputDateFormat : "DD-MM-YYYY", //if not iso date given as input
    dateDisplayFormat : "MMM DD YYYY",
    title : "Retention Analysis",
    cellClickEvent : function(date, day){
        //your closure with date=" + date + "&day="+ day;
    },
    showEmptyDataMessage : true,
    customEmptyDataMessage : null,
    enableInactive : false,
    dayClickEvent : function(day, startDate, endDate){
        //do something with day#, startDate and endDate
    },
    retentionDays : 7,
    retentionWeeks : 4,
    retentionMonths : 3,
    enableTooltip : true,
    enableDateRange : false,
    showAbsolute : false,
    toggleValues : true,
    showHeaderValues : false
}
```


### Usage:
```
$(selector).retention(options);
```

### Features:
```
You can figure out :)
```

### Release Notes
**v0.1.7:** 
    - Most of the issues fixed, Especially column header percentages.

### License
It is available under the [MIT license](http://www.opensource.org/licenses/mit-license.php) as Bootstrap, Moment.js, DateRangePicker.js is included in this repository

The MIT License (MIT)

Copyright (c) 2016 Jyothi Babu Araja

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
