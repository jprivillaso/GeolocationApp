app.controller("GeolocationController", ['$scope', 'LocationService', function($scope, LocationService){

    var defaultLocationData = {
        query: "0.0.0.0",
        country: "",
        regionName: "",
        city: "",
        timezone: "",
        lat: "",
        lon: ""
    };

    $scope.mapMarkers            = [];
    $scope.locationData          = defaultLocationData;
    $scope.isTableEmpty          = "";
    $scope.displayMap 	         = ""
    $scope.isWebsiteValid        = true;
    $scope.hideWebsiteEmptyError = true;

    var _addMarkerToScope = function (markerLatLng, isMyLocation) {

        var existentMarker = _.find($scope.mapMarkers, markerLatLng);

        if (!existentMarker && markerLatLng != null) {
            $scope.mapMarkers.push(_.extend(markerLatLng, {isMyLocation: isMyLocation}));
        }

    };

    var _addMarkersToMap = function(map) {

        var markers = $scope.mapMarkers;

        if (!_.isEmpty(markers)) {

            var markersLength = markers.length;

           for (var i = 0 ; i <= markersLength; i++) {

               var actualMarker = markers[i];

                var marker = new google.maps.Marker({
                    position: actualMarker,
                    map: map,
                    title: "My Location"
                });

            };

        }

    };

    var _showLocationInMap = function(data, isMyLocation) {

        var mapCanvas = document.getElementById('map');

        if (data) {

            var myLatLng = {lat: data.lat, lng: data.lon};
            var mapOptions = {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 3,
                center: myLatLng
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);

            _addMarkerToScope(myLatLng, isMyLocation);
            _addMarkersToMap(map);

        } else {

            if ($scope.mapMarkers.length === 0) {

                var map = new google.maps.Map(mapCanvas, {
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 3,
                    center: {lat: 12.5594634, lng: -38.4113713}
                });

            } else if (!_.isEmpty($scope.website)){
                $scope.locateWebsite();
            } else {
                $scope.hideWebsiteEmptyError = true;
            }

        }

    };

    var _updateLocationDetails = function(data){

        var now = new Date();
        $scope.locationData = data;
        $scope.tableEmpty = "visible";

    };

    var _validateUriTopLevelDomain = function(website) {

        var pattern = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

        website = "http://" + website;

        var uri = URI(website);
        var domain = uri.domain();
        var topLevelDomain = uri.tld();
        var subdomain = uri.subdomain();

        if (domain === topLevelDomain || domain.replace("www.", "") === topLevelDomain ||
            _.startsWith(uri.hostname(), ".") || _.endsWith(uri.hostname(), ".") ||
            _.isEmpty(domain)) {
            $scope.isWebsiteValid = false;
        } else if (_.isEmpty(subdomain)) {
            $scope.isWebsiteValid = pattern.test("www." + website);
        } else {
            $scope.isWebsiteValid = pattern.test(website);
        }

    };

    var _validateWebsite = function(website) {

        if (!_.isEmpty(website)) {

            if (!_.startsWith(website, "www")) {

                if (_.startsWith(website, "http") || _.startsWith(website, "ftp")) {
                    $scope.isWebsiteValid = false;
                } else {
                    _validateUriTopLevelDomain(website);
                }

            } else {
                _validateUriTopLevelDomain(website);
            }

        } else {
            $scope.isWebsiteValid = false;
        }

    };

    $scope.getMyLocation = function () {

        LocationService.getMyLocation().success(function(response){

            _updateLocationDetails(response);
            _showLocationInMap(response, true);
            $scope.displayMap = "visible";

        });

    };

    $scope.resetLocation = function () {

        if ((_.isEmpty($scope.website) && $scope.mapMarkers > 0) || !_.isEmpty($scope.website) ) {
            $scope.hideWebsiteEmptyError = true;
        } else {
            $scope.hideWebsiteEmptyError = false;
        }

        if ($scope.hideWebsiteEmptyError) {

           _updateLocationDetails(defaultLocationData);
            $scope.mapMarkers = _.reject($scope.mapMarkers, {isMyLocation: true});
            _showLocationInMap();
            $scope.tableEmpty = "";

        }

    };

    $scope.displayHelp = function(event) {

        var now = new Date();
        var alertMessage = "";

        if (event && event.currentTarget && event.currentTarget.attributes) {

            var helpText = event.currentTarget.attributes[1].value;
            alertMessage = "This is your " + helpText + " from ISP " + $scope.locationData.isp + " at " + now;

            alert(alertMessage);

        }

        return alertMessage;

    };

    $scope.locateWebsite = function() {

        var websiteToLocate = $scope.website;

        _validateWebsite(websiteToLocate);

        $scope.hideWebsiteEmptyError = true;

        if ($scope.isWebsiteValid && !_.isEmpty(websiteToLocate)) {

            LocationService.locateWebsite(websiteToLocate).success(function(response){

                if (response && response.status != "fail") {
                    _updateLocationDetails(response);
                    _showLocationInMap(response);
                    $scope.displayMap = "visible";
                } else {
                    $scope.isWebsiteValid = false;
                }

            });

        }

    };

    return {
        addMarkerToScope      : _addMarkerToScope,
        updateLocationDetails : _updateLocationDetails,
        validateWebsite       : _validateWebsite
    };

}]);