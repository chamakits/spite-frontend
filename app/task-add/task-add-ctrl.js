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

  function DataPair(key, value) {
    this[key] = value;
  }

  spiteAppControllers.controller("TaskAddCtrl", ["$scope", "$q", "AddTask",
    function($scope, $q, AddTask) {
      console.log("Spite app controller task add ctrl");

      $scope.DataPairs = [new DataPair()];

      $scope.AddEmptyDataPair = function(){
        $scope.DataPairs.push(new DataPair());
      }

      //This is just for testing for now.  Will need to change this later.
      $scope.addTask = function(dataValues) {
        var toAddTask = new AddTask();

        toAddTask.data = {};
        console.log("Data values:");
        console.log(dataValues);
        toAddTask.task = {
          "name": "Some Task Name",
          "nameToType": {
            "someFieldName": "someFieldType"
          },
          "nameToData": {
            "someFieldName": "someValue"
          }
        };

        toAddTask.$save();

        return false;
      }



    }
  ]);
}(this));
