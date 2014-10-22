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
            // document.getElementById('email-layout').id = 'layout';
            ToMenuLayout();
            $scope.dataPairs = [new KeyValuePair()];

            $scope.AddEmptyDataPair = function() {
                $scope.dataPairs.push(new KeyValuePair("", ""));
            }

            $scope.addTask = function(taskIn) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "positionClass": "toast-top-right",
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };

                toastr.info('Task added!');
                var toAddTask = new AddTask();
                toAddTask.task = {
                    // "id" : taskIn.id,
                    "name": taskIn.name,
                    "description": taskIn.description,
                    "nameToType": {},
                    "commandString": taskIn.commandString,
                };
                _.forEach($scope.dataPairs, function(current) {
                    toAddTask.task.nameToType[current.key] = current.value;
                });

                toAddTask.$save().then(function(succ) {
                    console.log("Succesfully called poast");
                    console.log(succ);
                }, function(err) {
                    console.log("Errored out in post call")
                    console.log(err);
                });
                return false;
            };
        }
    ]);
}(this));