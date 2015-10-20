var app = angular.module("GeolocationApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        controller: 'GeolocationController',
        templateUrl: '/templates/geolocation.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});
