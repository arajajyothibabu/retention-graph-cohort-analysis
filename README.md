# Retention graph (Cohort analysis)
Retention graph (Cohort Analysis) using Bootstrap ```(Beta*)```


###Demo:
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
    endDate : "5-05-2016",
    dateFormat : "DD-MM-YYYY", //if not iso date given as input
    dateDisplayFormat : "MMM DD YYYY",
    title : "Retention Analysis",
    cellClickEvent : closure(date, dayCount) //
}
```


###Usage:
```
$(selector).Retention(options);
```

###Features:
```
Yet to come :)
```
