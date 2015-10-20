# GeoLocation App #
This project is a Geolocation App that retrieves your position or a custom url location in a map


## Getting Started
Download all the project at the left side bar or clone the repository

## Dependencies
NodeJs and NPM installed on your machine

Libraries used: 

1. AngularJs         -> Powerful javascript framework
2. AngularJs-Mocks   -> To create mocks in tests in AngularJs
3. Angular-Route     -> To create routes easily in the application
4. Bootrstap         -> Powerful library to create responsive sites
5. Jquery            -> Chose JQuery to navigate through DOM
6. lodash            -> Has a lot of useful methods for Strings, Collections and Objects that can be used in any application
7. Jasmine           -> UI testing because it has a good integratino with Angularjs
8. Karma             -> To run the tests with node.js from the console
9. bower             -> To easily manage ui dependencies 
10. Express          -> Easy NodeJs framework for creating web application
11. Google-Maps      -> Google Maps library to display maps and markers inside it
12. Google-Maps-Mock -> Google Maps mock library to allow to test the application
13. URI              -> Library to manipulate URI's

Download node [here](https://nodejs.org/en/).

## Clone Geolocation App

    git clone https://jprivillaso@bitbucket.org/ac-recruitment/ui-challenge.git

## Run the Application

The application must have all the dependencies installed in order to run without any problems. 
Type in your shell the following
  
    npm start

When you type "npm start" the application is going to follow the next steps

  1. npm install    -> Install all the dependencies of the project and place them in a folder called npm_modules
  2. bower install  -> Install all the ui dependencies and place them in a folder called bower_components
  3. node ./bin/www -> Start a local server throug a script called www

The first time you run the script, it will take some time because it will download all the dependencies

After the following message appears in your console, you will be able to run your application

    node ./bin/www

By default it's configured at port 3000, so access your browser at http://localhost:3000

## Directory Layout

```
  root/
    bin/
      www -> Script to start a local server
    node_modules/ --> node dependencies
    public/           
      bower_components/ -> front-end dependencies
        angular/        -> library files
        angular-mocks/  -> library files
        angular-route/  -> library files
        bootstrap/      -> library files
        jquery/         -> library files
        lodash/         -> library files
      css/
        geolocation.css -> app styles
    routes/ 
      index -> Index route to retrieve index.html
    images/
    js/
      controllers/
        GeolocationController.js -> GeolocationApp Controller and funcionality
      directives/
      services/
        Location.js -> Service that retrieves information of the sites
      tests/ 
        GeolocationTest.js
      vendor/
        google-maps.js      -> Google Maps api to display maps in your app
        google-maps-mock.js -> Google Maps Mock for testing
        URI.min.js          -> URI manipulation
      geolocation.js -> angular app definition
    templates/
      geolocation.html -> Geolocation html template
    favicon.ico    
  app.js        -> node-express application script
  .bowerrc      -> bower configuration file
  bower.js      -> bower dependencies configuration file
  karma.conf.js -> config file for running unit tests with Karma
  package.json  -> node dependencies configuration
```

## Tests

Tests can be executed typing the following at your command line

    npm test

A browser will be open and an overview of the tests will be displayed at the console

## Comments

I didn't understand so well what to do in case that a user clicks more than once in the locate button with a different 
website, then I assumed that It will maintain all the markers in the map, also when the user clicks in the myLocation
button. After clicking in the reset location, the application clear MyLocation marker.

This was the first time that I used AngularJs (I had been studying AngularJs but I haven't worked with it) for creating
a not small application, then I don't know if I used the correct and proper code guidelines. I tried to anyway.

It was also my first time writing unit tests for a UI Application, the I made some decisions that I don't know if they were
correct. I am talking about testing private methods inside a controller. I used a notation with '_' before the method name to
indicate that it is a private method, however, I exposed them in order to be able to test at my test scripts. Surely there may 
be a better way to do it. I really wanted to create tests for funcionalities like validateWebsite input or adding markers to 
the mapMarkers variable inside the scope where I keep track of the actual displayed markers in the map.