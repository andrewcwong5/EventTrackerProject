# EventTrackerProject
## Overview
This project keeps track of meals consumed by a user. It records the name of the meal of the day(breakfast, lunch, etc.), what foods were eaten, the total calories, and the cost of the food. This is the backend database with CRUD functionality using Spring Rest. It can be used as part of a diet or budget app.

An Angular front end was added to display the database data in http.
It can be reached on http://localhost:4209/meals

There's a nav bar at the top.
A create form is under that.
Then an entire list of all the meals is displayed.
Clicking the `name` in the row will display a detailed view of the selected meal.

In the detailed view you can edit that 'meal' with the update form at the bottom of the page. If you want to go back just click the cancel button.

## Technologies/Topics Applied
RESTful web service allows a client to retrieve and manage resources stored on a server by using JPA Repository and Service classes instead of DAOs.

Spring JPA

Visual Studio Code editor using Angular/javascript

Postman to test RESTful APIs
listall - GET - http://localhost:8082/api/meal

searchById - GET - http://localhost:8082/api/meal/(id)

create - POST - http://localhost:8082/api/meal

update - PUT - http://localhost:8082/api/meal/(id)

delete - DELETE - http://localhost:8082/api/meal/(id)




## Lessons Learned
Packages root need to be named the same in the boot and JPA folders.

remember to change to JSON instead to text in Postman otherwise you get input error.

Really important to have the right build.gradle, settings.gradle and applications.properties otherwise you'll just keep copy pasting the broken code throughout each new project.

misplaced closing </div> can result in nothing being output on html page.
