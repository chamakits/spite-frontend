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

    var URLRunTask = "http://localhost:9090/api/run-task";
    spiteAppControllers.factory("RunTask", ["$resource", function($resource) {
        return $resource(URLRunTask, {}, {
            query: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });
    }]);

    spiteAppControllers.controller("TaskListCtrl", [
        "$scope", "$q", "GetTasks", "GetTaskDetail", "RunTask",
        function($scope, $q, GetTasks, GetTaskDetail, RunTask) {
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
                    var taskDetail = succ.task;
                    console.log("Task view:");
                    console.log(taskDetail);
                    $scope.taskDetail = taskDetail;
                    $scope.taskDetail.nameToTypeAndValue =
                        _.chain(taskDetail.nameToType).pairs()
                        .collect(
                            function(currPair) {
                                return {
                                    fieldName: currPair[0],
                                    type: currPair[1],
                                    value: "",
                                }
                            }).value();
                }, function(err) {

                });

                // TODO rethink this.  Not doing it right.  Running task should probably go elsewhere
                // TODO rethink how to get the data in.
            };

            $scope.runTask = function(taskDetail) {
                //$scope.taskDetail.nameToTypeAndValue
                var runTask = new RunTask();
                runTask.view = {
                    // "id" : taskIn.id,
                    "name": taskDetail.name,
                    "description": taskDetail.description,
                    "nameToData": {}
                };
                runTask.data = {
                    nameToData: {},
                };
                _.forEach(taskDetail.nameToTypeAndValue, function(current) {
                    runTask.data.nameToData[current.fieldName] = current.value;
                });

                var deferred = $q.defer();
                var promise = getEncodedFileUpload(deferred).promise;
                promise.then(function(base64EncodedFile) {
                    runTask.data.nameToData._upload = base64EncodedFile;
                    runTask.$save().then(function(succ) {
                        console.log("Succesfully called poast");
                        console.log(succ);
                    }, function(err) {
                        console.log("Errored out in post call")
                        console.log(err);
                    });
                }, function(err) {
                    console.log("Errored out on encoding file");
                    console.log(err);
                });


            };

        }
    ]);


    function getEncodedFileUpload(deferred) {
        var selectedFile = document.getElementById('fileInput').files[0];
        if (!selectedFile) {
            deferred.resolve(null);
            return deferred;
        }
        var reader = new FileReader();


        reader.onload = (function(promise) {
            return function(e) {
                var stringResult = e.target.result;
                // console.log("Lenght of encoded string:"+stringResult.length)
                console.log("Encoded file:");
                console.log(stringResult);
                promise.resolve(stringResult);
            }
        }(deferred));

        reader.readAsDataURL(selectedFile);

        return deferred;
    }
}(this));