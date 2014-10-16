(function() {
    var URL = "http://localhost:9090/api/run-task";
    var spiteAppControllers = angular.module("spiteAppControllers");

    spiteAppControllers.factory("AddData", ["$resource", function($resource) {
        return $resource(URL, {}, {
            query: {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        });
    }]);

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



    spiteAppControllers.controller("TaskRunCtrl", ["$scope", "$q", "AddData",
        function($scope, $q, AddData) {
            console.log("Spite app controller task add ctrl");

            $scope.dataPairs = [new KeyValuePair()];

            $scope.AddEmptyDataPair = function() {
                $scope.dataPairs.push(new KeyValuePair("", ""));
            }

            //This is just for testing for now.  Will need to change this later.
            $scope.runTask = function() {
                var toAddData = new AddData();

                toAddData.data = {
                    "nameToData": {}
                };

                _.forEach($scope.dataPairs, function(current) {
                    toAddData.data.nameToData[current.key] = current.value;
                });

                console.log("Data values:");
                console.log(toAddData.data);


                var deferred = $q.defer();
                var promise = getEncodedFileUpload(deferred).promise;
                promise.then(function(base64EncodedFile) {
                    toAddData.data.nameToData._upload = base64EncodedFile;
                    toAddData.$save().then(function(succ) {

                        console.log("Successfully called post");
                        console.log(succ);
                    }, function(err) {
                        console.log("Error calling post");
                        console.log(err);
                    });
                }, function(err) {
                    console.log("Errored out on encoding file");
                    console.log(err);
                });
                return false;
            }



        }
    ]);
}(this));