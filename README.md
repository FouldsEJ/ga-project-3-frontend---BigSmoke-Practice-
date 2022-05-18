# Big Smoke - GA SEI Project 3

## Project Overview

Big Smoke is a full stack app that uses a Mongo database in the backend, which serves a React frontend. The project was completed within 7 days and group-coded with [Priya Patel](https://github.com/Pea75x) and [Tatiana Guzun](https://github.com/TatianaRG). The app is designed to list places to visit in London and gives the user functionality to register/login and leave reviews and likes on places. The app also includes search functionality and maps.

**TECHNOLOGIES USED:** HTML, CSS/Sass, JavaScript, React, Bulma, Axios, Node.js, MongoDB, react-router-dom, react-map-gl, Netlify, Heroku,

**LINK:**

# The Brief

- **Build a full-stack application by making your own backend and your own front-end.**
- **Use an Express API to serve your data from a Mongo database.**
- **Consume your API with a separate front-end built with React.**
- **Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models.**
- **Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.**
- **Be deployed online so it’s publicly accessible.**

## Approach

### **1) Planning**

As a group we started by deciding what our web application wanted to be about. We brainstormed a few different ideas, but settled with a site providing a list of London places which users could interact with by liking and reviewing. From here, our next step was to create a simple wireframe of what we wanted our final end product to look like - this ensured we were all aligned and clearly understood the end product. In addition, we mapped out each of our planned backend models and the data that would be stored in each.

![Frontend planning](client/src/images/readme-images/frontend-planning.png)
![Backend planning](client/src/images/readme-images/frontend-planning.png)

As a group we used Trello to organise the tasks and color coded the tasks to identify the action owner. Each member of the group worked full stack. We developed the backend first, before focussing our attention on the frontend. We would come together to merge conflicts and review each other's code in a daily stand-up each morning and would also collaborate on an adhoc basis if anyone was having difficulties. My primary focus on the backend included seeding the data, creating the review controller and putting together the secure route - on the frontend, it included the PlaceShow.js component and the MapSearch.js.

![Trello board](client/src/images/readme-images/trello-board.png)

### **2) Functionality**

#### Backend

As a group, we developed a backend using MongoDB as the database and used Mongoose to interact with the database. We used Mongoose to create models which performed CRUD actions on the relevant collection in the database and also used it to validate the data. The models were constructed using Schema. We put together 3 models; places, stations and users, each of which had data validation included e.g. 'type: String, required: true, maxlength: 300'. Within the models, we used both embedded data and referenced data.The places model is a good example of both of these. It contains reviews (an embedded schema) and it uses a number of referenced data e.g. stationID and itinerary, which take their data from different models, the stationID taking its id from the station model and the itinerary taking the id of a user.

![Places model](client/src/images/readme-images/places-model.png)

For each of our models we created a controller, which contained a set of functions to handle each separate route. For example, the reviews controller has an update, create and delete function. The router.js file then directs each route to the correct function.

The seeding of the data was done manually, with the exception of the stations data, which I enjoyed seeding using the google spreadsheets API. This saved us the time of inputting each individual London Tube station manually.

#### Frontend

Although we worked across all components together, we did initially divide the components between each other. I spent the majority of my time working on the PlaceShow.js component and the MapSearch.js component.

The MapSearch.js component was enjoyable to create. Using react-map-gl, I was able to integrate the Map as a controllable component into the search page and use the data passed in by props to show only the pins for the places that the user was searching for. This integrated nicely with the SearchPage.js component, which using a piece of state called ‘searchCriteria’ that was updated on any change to the search form, re-fetched the place data and hence the filtered list of places and in turn the pins showing on the map.

## Wins & Blockers

### **Wins:**

- A successfully functioning and extensive app, with a large amount of functionality, a clean user experience and created within 7 days was a great achievement.
- A very slick and succinct discover page, which made use of query params in both the front and back end to update the users search instantaneously.
- Implementing reat-map-gl into the project (with some extra functionality then my previous projects) including multiple clickable pins was challenging, but overall successful. It really adds to the functionality of the discover page.

### **Blockers:**

- Initially working with Git and using feature branches as a team of 3 took some getting used to, but by the end of the project we all felt proficient using it. Good communication was crucial to ensure we avoided any challenging merge conflicts.

## Bugs

- No identified bugs

## Future Improvements

- I would like to improve the functionality of the map search, which would show you the details of the place onHover of the map pin.

## Key Takeaways

This was my first group-programming project and my first full stack application and I really enjoyed it. Working alongside two other people provided a great opportunity to learn from them, overcome hurdles and fix bugs together. Likewise, it also gave me a confidence boost teaching them new skills and explaining my code to them or helping to fix their coding issues. During the project, I became more proficient with git and github and built upon existing communication and leadership skills when helping to guide the team through challenges. Overall, I am very satisfied with the end product and the extensive amount of work and functionality we achieved in the 7 days we were given.

## Contact:

- Github: github.com/FouldsEJ
- Linkedin: linkedin.com/in/edwardfoulds
- Portfolio: edwardfoulds.co.uk
