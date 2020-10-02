# Retention graph (Cohort analysis Graph)
[![npm version](https://badge.fury.io/js/cohort-graph.svg)](https://badge.fury.io/js/cohort-graph)

Cohort Analysis Graph

#### [Live Demo](http://arajajyothibabu.github.io/retention-graph-cohort-analysis/)

##### New Library without any external dependencies and handling only visual layer without controls for data

#### Usage:
    
- install
    
        npm install --save cohort-graph
        
- usage

        var cohortGraph = new CohortGraph(element, data, options);
        
        
###### Working on options



##### [React Version](https://apxor.github.io/react-cohort-graph/) of same Graph
    
    
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    

### Outdated Library - found in folder old with options for controls

![alt tag](http://i.imgur.com/uJQTG1Q.png)

### Input options:
```JSON
{
  "data": {
    "days": {
      "22-05-2016": [
        200,
        10,
        20,
        30,
        40,
        10,
        20,
        20
      ],
      "23-05-2016": [
        300,
        200,
        150,
        50,
        20,
        20,
        90,
        100
      ],
      "24-05-2016": [
        200,
        110,
        150,
        50,
        10,
        20,
        30,
        40
      ],
      "25-05-2016": [
        100,
        10,
        10,
        50,
        20,
        20,
        60,
        0
      ]
    },
    "weeks": {
      "week1": [
        200,
        10,
        20,
        30,
        40,
        10,
        20,
        20
      ],
      "week2": [
        300,
        200,
        150,
        50,
        20,
        20,
        90,
        100
      ],
      "week3": [
        200,
        110,
        150,
        50,
        10,
        20,
        30,
        40
      ]
    },
    "months": {
      "month1": [
        200,
        10,
        20,
        30,
        40,
        10,
        20,
        20
      ],
      "month2": [
        300,
        200,
        150,
        50,
        20,
        20,
        90,
        100
      ],
      "month3": [
        200,
        110,
        150,
        50,
        10,
        20,
        30,
        40
      ],
      "month4": [
        100,
        10,
        10,
        50,
        20,
        20,
        60,
        0
      ]
    }
  },
  "startDate": "22-05-2016",
  "endDate": "25-05-2016",
  "inputDateFormat": "DD-MM-YYYY",
  "dateDisplayFormat": "MMM DD YYYY",
  "title": "Retention Analysis",
  "showEmptyDataMessage": true,
  "customEmptyDataMessage": null,
  "enableInactive": false,
  "retentionDays": 7,
  "retentionWeeks": 4,
  "retentionMonths": 3,
  "enableTooltip": true,
  "enableDateRange": false,
  "showAbsolute": false,
  "toggleValues": true,
  "showHeaderValues": false,
  "cellClickEvent" : function(date, day){
    /* your closure with date=" + date + "&day="+ day; */
  },
  "dayClickEvent" : function(day, startDate, endDate){
    /* do something with day#, startDate and endDate */
  }
}
```

### Release Notes
**v0.5.6:** 
    - Most of the issues fixed, Especially column header percentages.
