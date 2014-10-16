(function(that) {

    var URL = "http://localhost:9090/api/show-tasks";

    var spiteAppControllers = angular.module("spiteAppControllers");

    spiteAppControllers.factory("GetTasks", ["$resource", function($resource) {
        return $resource(URL, {}, {
            query: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                // isArray: true
            }
        });
    }]);

    spiteAppControllers.factory("RunTaskNew", ["$resource", function($resource) {
        return $resource(URL, {}, {
            query: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },

                // isArray: true
            }
        });
    }]);

    spiteAppControllers.controller("TaskListCtrl", ["$scope", "$q", "GetTasks", "RunTaskNew",
        function($scope, $q, GetTasks, RunTaskNew) {

            var getTaskService = new GetTasks();
            var servicePromise = getTaskService.$save();
            servicePromise.then(
                function(succ) {
                    console.log("Success:");
                    console.log(succ);
                    $scope.listEntries = succ.taskViews;
                },
                function(err) {
                    console.log("Error:");
                    console.log(err);
                });

            $scope.runTask = function(task) {
                console.log(task)
                var runTaskService = new RunTaskNew();
                // TODO rethink this.  Not doing it right.  Running task should probably go elsewhere
                // TODO rethink how to get the data in.
            };

        }
    ]);

}(this));