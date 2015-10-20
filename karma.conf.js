module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'public/bower_components/jquery/jquery.js',
      'public/js/vendor/URI.min.js',
      'public/bower_components/angular/angular.js',
      'public/bower_components/angular-route/angular-route.js',
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/lodash/lodash.min.js',

      'public/js/vendor/google-maps-mock.js',

      'public/js/geolocation.js',
      'public/js/controllers/*.js',
      'public/js/services/*.js',

      'public/js/tests/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ]

  });
};
