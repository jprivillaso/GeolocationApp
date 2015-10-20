describe('Service: Geolocation', function() {

    beforeEach(module('GeolocationApp'));

    var $scope;
    var $rootScope;
    var httpBackend;
    var LocationService;
    var $controller ;

    /*Inject the Factory*/
    beforeEach(function() {
        inject(function($injector) {
            LocationService = $injector.get('LocationService');
        });
    });

    /* Inject the scope and http backend to mock $http service */
    beforeEach(inject(function (_$rootScope_, $httpBackend, _$controller_){
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        httpBackend = $httpBackend;
        $controller = _$controller_;
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe("Service: LocationService", function() {

        it("should retrieve Belo Horizonte's location", function() {

            // Mock Http request
            var myMockLocation = {"lat":-19.9167, "lon":-43.9333};
            httpBackend.expectGET('http://ip-api.com/json/').respond(200, myMockLocation);

            var locateWebsite = LocationService.getMyLocation();
            httpBackend.flush();

            expect(locateWebsite).not.toBe(null);

            locateWebsite.success(function(data){
                expect(data.lat).toEqual(-19.9167);
                expect(data.lon).toEqual(-43.9333);
            });

        });

        it("should retrieve Google's location", function() {

            // Mock Http request
            var googleMockLocation = {"lat":37.4192, "lon":-122.0574};
            httpBackend.expectGET('http://ip-api.com/json/www.google.com').respond(200, googleMockLocation);

            var locateWebsite = LocationService.locateWebsite("www.google.com");
            httpBackend.flush();

            expect(locateWebsite).not.toBe(null);

            locateWebsite.success(function(data){
                expect(data.lat).toEqual(37.4192);
                expect(data.lon).toEqual(-122.0574);
            });

        });

        it("should retrieve an error status", function() {

            var locateWebsite = LocationService.locateWebsite();
            expect(locateWebsite.status).toEqual("missing parameter");
            expect(locateWebsite.status).not.toBe(null);

        });

    });

    describe("GeolocationController", function() {

        it("should add a marker to the $scope", function(){

            var controller = $controller('GeolocationController', { $scope: $scope, LocationService: LocationService });

            var markerLatLng = {
              lat: 37.4192,
              lng: -122.0574
            };

            controller.addMarkerToScope(markerLatLng, false);

            expect($scope.mapMarkers).not.toBe(null);
            expect($scope.mapMarkers.length).toBeGreaterThan(0);
            expect($scope.mapMarkers[0]).toEqual(jasmine.objectContaining(markerLatLng));

        });

        it("should not add a marker to the $scope", function(){

            var controller = $controller('GeolocationController', { $scope: $scope, LocationService: LocationService });

            $scope.mapMarkers = [];
            controller.addMarkerToScope(null, false);

            expect($scope.mapMarkers).not.toBe(null);
            expect($scope.mapMarkers.length).toEqual(0);

        });

        it("should remove myActualLocation from the mapMarkers", function(){

            var defaultLocationData = {
                query: "0.0.0.0",
                country: "",
                regionName: "",
                city: "",
                timezone: "",
                lat: "",
                lon: ""
            };

            var controller = $controller('GeolocationController',
                             { $scope: $scope, LocationService: LocationService });

            $scope.mapMarkers = [{
                lat: -19.9167,
                lng: -43.9333,
                isMyLocation: true
            }];

            $scope.website = "www.google.com";
            $scope.hideWebsiteEmptyError = true;
            $scope.resetLocation();

            expect($scope.tableEmpty).toEqual("");
            expect($scope.mapMarkers).not.toBe(null);
            expect($scope.mapMarkers.length).toEqual(0);

        });

    });

    describe("InputFields validation", function() {

        it("should set isWebsiteValid as true", function() {

          var controller = $controller('GeolocationController',
                          { $scope: $scope, LocationService: LocationService });

          controller.validateWebsite("www.google.com");
          expect($scope.isWebsiteValid).toBe(true);

        });

        it("should set isWebsiteValid as false: URL with no topLevelDomain", function() {

          var controller = $controller('GeolocationController',
                           { $scope: $scope, LocationService: LocationService });

          controller.validateWebsite("www.google");
          expect($scope.isWebsiteValid).toBe(false);

        });

        it("should set isWebsiteValid as true: URL with no subdomain", function() {

          var controller = $controller('GeolocationController',
                           { $scope: $scope, LocationService: LocationService });

          controller.validateWebsite("google.com");
          expect($scope.isWebsiteValid).toBe(true);

        });

      it("should set isWebsiteValid as false: URL with protocol", function() {

        var controller = $controller('GeolocationController',
                        { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite("http://www.google.com");
        expect($scope.isWebsiteValid).toBe(false);

      });

      it("should set isWebsiteValid as false: URL without subdomain and with dot", function() {

        var controller = $controller('GeolocationController',
                         { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite(".google.com");
        expect($scope.isWebsiteValid).toBe(false);

      });

      it("should set isWebsiteValid as false: URL three dots", function() {

        var controller = $controller('GeolocationController',
                        { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite("...");
        expect($scope.isWebsiteValid).toBe(false);

      });

      it("should set isWebsiteValid as false: URL ends with dot", function() {

        var controller = $controller('GeolocationController',
                        { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite("google.");
        expect($scope.isWebsiteValid).toBe(false);

      });

      it("should set isWebsiteValid as false: Null parameter", function() {

        var controller = $controller('GeolocationController',
                         { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite(null);
        expect($scope.isWebsiteValid).toBe(false);

      });

      it("should set $scope.isWebsiteValid as false because of special characters", function() {

        var controller = $controller('GeolocationController',
                        { $scope: $scope, LocationService: LocationService });

        controller.validateWebsite("##.com");
        expect($scope.isWebsiteValid).toBe(false);

      });

  });

    describe("Help Text Validation", function() {

        it("should retrieve a message with the element helpText and locationData isp", function() {

            var event = {currentTarget: {
                attributes: [{}, {value: "IP"}]
            }};

            var controller = $controller('GeolocationController', { $scope: $scope, LocationService: LocationService });

            $scope.locationData = {
                isp: "Virtua"
            };

            var now = new Date();
            expect($scope.displayHelp(event)).toBe("This is your IP from ISP Virtua at " + now);

        });

        it("should retrieve an empty string", function() {

            var controller = $controller('GeolocationController', { $scope: $scope, LocationService: LocationService });

            $scope.locationData = {
                isp: "Virtua"
            };

            expect($scope.displayHelp(null)).toBe("");

        });

    });

})