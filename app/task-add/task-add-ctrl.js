(function() {
  var URL = "http://localhost:9090/api/addtask";
  var spiteAppControllers = angular.module("spiteAppControllers");

  spiteAppControllers.factory("addtask", ["$resource", function($resource) {
    return $resource(URL, {}, {
      query: {
        method: "POST",
        //TODO if it fails, it might be from missing params here.  but shouldn't be.
        //TODO trying to fully validate what I said.
        headers: {
          'Content-Type': 'application/json'
        }
      }
    });
  }]);

  //From http://stackoverflow.com/questions/17710147/jquery-js-get-input-file-image-in-base64-encoded
  function el(id) {
      return document.getElementById(id);
    } // Get elem by ID

  function readImage() {
    if (this.files && this.files[0]) {
      var FR = new FileReader();
      FR.onload = function(e) {
        el("img").src = e.target.result;
        el("base").innerHTML = e.target.result;
      };
      FR.readAsDataURL(this.files[0]);
    }
  }


  function getEncodedFileUpload(deferred) {
    var selectedFile = document.getElementById('fileInput').files[0];
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

  spiteAppControllers.controller("TaskAddCtrl", ["$scope", "$q", "addtask",
    function($scope, $q, addtask) {
      console.log("Spite app controller task add ctrl");

      //This is just for testing for now.  Will need to change this later.
      $scope.addTask = function(dataValues) {
        var toAddTask = new addtask();
        // dataValues._upload = getEncodedFileUpload();
        toAddTask.data = dataValues;
        toAddTask.task = {
          "name": "Task name",
          "nameToType": {
            "someFieldName": "someFieldType"
          },
          "nameToData": {
            "someFieldName": "someValue"
          }
        };
        var deferred = $q.defer();
        var promise = getEncodedFileUpload(deferred);
        promise.then(function(base64EncodedFile){
          dataValues._upload = base64EncodedFile;
        }, function(err){
          console.log("Errored out on encoding file");
          console.log(err);
        });
      }



    }
  ]);
}(this));
