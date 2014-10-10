(function() {
  var spiteApp = angular.module("spiteApp", ["spiteAppControllers",
    "ngResource", "ngRoute"
  ]);

  var spiteAppControllers = angular.module("spiteAppControllers", []);

  spiteApp.config(["$routeProvider", function($routeProvider) {
    $routeProvider
      .when("/task-run", {
        templateUrl: "/app/task-run/task-run-part.html",
        controller: "TaskRunCtrl"
      })
      .when("/task-add", {
        templateUrl: "/app/task-add/task-add-part.html",
        controller: "TaskAddCtrl"
      })
      .otherwise({
        redirectTo: "/"
      });

  }]);

  spiteAppControllers.controller("")

}(this));
