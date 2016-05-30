# Retention graph (Cohort analysis)
Retention graph (Cohort Analysis) using Bootstrap ```(v0.1.5)```


###Demo:

####[Live Demo](http://arajajyothibabu.github.io/retention-graph-Cohort-analysis/)

![alt tag](http://i.imgur.com/uJQTG1Q.png)

###Input options:
```
{
    data : {
        "22-05-2016" : [200, 10, 20, 30, 40, 10, 20, 20],
        "23-05-2016" : [300, 200, 150, 50, 20, 20, 90, 100 ],
        "24-05-2016" : [200, 110, 150, 50, 10, 20, 30, 40],
        "25-05-2016" : [100, 10, 10, 50, 20, 20, 60, 0]
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
    customEmptyDataMessage : null
}
```


###Usage:
```
$(selector).retention(options);
```

###Features:
```
Yet to come :)
```

###License
It is available under the [MIT license](http://www.opensource.org/licenses/mit-license.php) as Bootstrap, Moment.js is included in this repository

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
