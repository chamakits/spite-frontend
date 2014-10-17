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

    var URLTaskDetail = "http://localhost:9090/api/get-task-detail";
    spiteAppControllers.factory("GetTaskDetail", ["$resource", function($resource) {
        return $resource(URLTaskDetail, {}, {
            query: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        });
    }]);

    spiteAppControllers.controller("TaskListCtrl", ["$scope", "$q", "GetTasks", "GetTaskDetail",
        function($scope, $q, GetTasks, GetTaskDetail) {
            // document.getElementById('layout').id = 'email-layout';
            ToEmailLayout();
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

            $scope.getTaskDetails = function(taskView) {
                console.log(taskView)
                var runTaskService = new GetTaskDetail();

                runTaskService.view = taskView;
                var servicePromise = runTaskService.$save();

                servicePromise.then(function(succ) {
                    var detailView = succ;
                    console.log("Detail view:");
                    console.log(detailView);
                }, function(err) {

                });

                // TODO rethink this.  Not doing it right.  Running task should probably go elsewhere
                // TODO rethink how to get the data in.
            };

        }
    ]);

}(this));