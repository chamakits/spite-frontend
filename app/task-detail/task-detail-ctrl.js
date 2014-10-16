(function(that) {
    console.log("")
    var URL = "http://localhost:9090/api/get-task-detail";

    var spiteAppControllers = angular.module("spiteAppControllers");

    spiteAppControllers.factory("GetTaskDetail", ["$resource", function($resource) {
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

    //s
    spiteAppControllers.controller("TaskDetailCtrl", ["$scope", "$q", "GetTaskDetail",
        function($scope, $q, GetTaskDetail) {
            $scope.getTaskDetail = function(taskName) {
                var getTaskService = new GetTaskDetail();
                getTaskService.view = {
                    "name": taskName
                };
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
        }
    ]);

    //e


}(this));