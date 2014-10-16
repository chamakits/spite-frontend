(function(that) {
    var spiteApp = angular.module("spiteApp", ["spiteAppControllers",
        "ngResource", "ngRoute"
    ]);

    function MenuLinks(template, controller, link, text) {
        this.template = template;
        this.controller = controller;
        this.link = link;
        this.text = text;
    };
    that.MenuLinks = MenuLinks;

    var spiteAppControllers = angular.module("spiteAppControllers", []);

    var links = [
        new MenuLinks("/app/task-run/task-run-part.html",
            "TaskRunCtrl", "/task-run", "Task Run"),
        new MenuLinks("/app/task-add/task-add-part.html",
            "TaskAddCtrl", "/task-add", "Task Add"),
        new MenuLinks("/app/task-list/task-list-part.html",
            "TaskListCtrl", "/task-list", "Task List"),
        new MenuLinks("/app/task-detail/task-detail-part.html",
            "TaskDetailCtrl", "/task-detail", "Task Detail"),
    ];


    spiteAppControllers.controller("MenuController", ["$scope", function($scope) {
        $scope.headers = links;
    }]);

    spiteApp.config(["$routeProvider", function($routeProvider) {
        // $routeProvider
        //   .when("/task-run", {
        //     templateUrl: "/app/task-run/task-run-part.html",
        //     controller: "TaskRunCtrl"
        //   })
        //   .when("/task-add", {
        //     templateUrl: "/app/task-add/task-add-part.html",
        //     controller: "TaskAddCtrl"
        //   })
        //   .otherwise({
        //     redirectTo: "/"
        //   });



        var routeProvider = $routeProvider;
        _(links).forEach(function(link) {
            console.log("Setting links.");
            routeProvider = routeProvider.when(link.link, {
                templateUrl: link.template,
                controller: link.controller
            });
        });
        routeProvider.otherwise({
            redirectTo: "/"
        });

    }]);

    spiteAppControllers.controller("")

}(this));