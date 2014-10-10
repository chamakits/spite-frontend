(function() {
  var URL = "http://localhost:9090/api/add-task";
  var spiteAppControllers = angular.module("spiteAppControllers");

  spiteAppControllers.factory("AddTask", ["$resource", function($resource) {
    return $resource(URL, {}, {
      query: {
        method: "POST",
        //TODO if it fails, it might be from missing params here.  but shouldn't be.
        //TODO trying to fully validate what I said.
        params: {
                    "data": {},
                    "task": {}
        },
        headers: {
          'Content-Type': 'application/json'
        },
        response: function(resp) {
          console.log("Success on resource query set.");
        }
      }
    });
  }]);

  spiteAppControllers.controller("TaskAddCtrl", ["$scope", "$q", "AddTask",
    function($scope, $q, AddTask) {

    }
  ]);
}(this));
