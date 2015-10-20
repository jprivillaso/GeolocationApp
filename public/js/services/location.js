app.factory("LocationService", ['$http', function($http){

    var BASE_PATH = "http://ip-api.com/json/";

    var _locateWebsite = function(website) {

        if (website) {
            return $http.get(BASE_PATH + website)
            .success(function(data){
                return data;
            })
            .error(function(err){
                return err;
            });
        } else {
            return {status: "missing parameter"};
        }

    };

    var _getMyLocation = function() {

        return $http.get(BASE_PATH)
        .success(function(response){
            return response;
        })
        .error(function(error){
            return error;
        });

    };

    return {
        locateWebsite : _locateWebsite,
        getMyLocation : _getMyLocation
    }

}]);