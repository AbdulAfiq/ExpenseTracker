var app = angular.module('expensesApp', ['ngRoute']);

//helper
var myHelper = {
    dateObjToString: function(dateObj) {
        var year, month, day;
        year = String(dateObj.getFullYear());
        month = String(dateObj.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(dateObj.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + '-' + day 
    },
    stringToDateObj: function(string) {
        return new Date(string.substring(0,4), string.substring(5,7) -1, string.substring(8,10));
    }
}

app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'views/expenses.html',
            controller: 'ExpensesViewController'
        })
        .when('/expenses', {
            templateUrl: 'views/expenses.html',
            controller: 'ExpensesViewController'
        })
        .when('/expenses/new', {
            templateUrl: 'views/expenseForm.html',
            controller: 'ExpenseViewController'
        })
        .when('/expenses/edit/:id', {
            templateUrl: 'views/expenseForm.html',
            controller: 'ExpenseViewController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.factory('Expenses', function(){
    var service = {};

    service.entries = [
        {id:1, description:'food', amount: 10, date:'2014-10-01'},
        {id:2, description:'tickets', amount: 11, date:'2014-10-02'},
        {id:3, description:'food', amount: 12, date:'2014-10-03'},
        {id:4, description:'phone credit', amount: 13, date:'2014-10-04'},
        {id:5, description:'bills', amount: 14, date:'2014-10-05'},
        {id:6, description:'food', amount: 15, date:'2014-10-06'},
    ];

    service.getNewId = function () {
        if (service.newId) {
            service.newId++;
            return service.newId;
        }
        else {
            var entryMaxId = _.max(service.entries, function(entry){return entry.id;});
            service.newId = entryMaxId.id+1;
            return service.newId;
        }
    }

    service.entries.forEach(function(element){
        element.date = myHelper.stringToDateObj(element.date);
    });

    service.save = function(entry) {
        entry.id = service.getNewId();
        service.entries.push(entry);
    };

    return service;
});

app.controller('ExpensesViewController', ['$scope', 'Expenses', function($scope, Expenses){
    $scope.expense = {
        description: 'food',
        amount: 10
    };

    $scope.phrase = 'the sky is blue';
    
    $scope.increaseAmount = function() {
        $scope.expense.amount++;
    }

    $scope.items = [
        {
            name: 'pizza',
            ingredients: ['cheese', 'tomato', 'oregano', 'salt']
        },
        {
            name: 'tortilla',
            ingredients : ['butter', 'salt', 'pepper', 'garlic']
        },
        {
            name: 'cake',
            ingredients: ['cream', 'sugar']
        },
        {
            name: 'empanada',
            ingredients: ['flour', 'meat', 'onion']
        }
    ];

    $scope.expenses = Expenses.entries;
}]);

app.controller('HomeViewController', ['$scope', function($scope){
    $scope.appTitle = "Simple Expenses Tracker";
}]);

app.controller('ExpenseViewController', ['$scope', '$routeParams', '$location', 'Expenses', function($scope, $routeParams, $location, Expenses){
    //$scope.someText = 'The world is round. ID=' + $routeParams.id + 'The first entry is : ' + Expenses.entries[0].description;

    if (!$routeParams.id){
        $scope.expense = {id: 7, description: 'something', amount: 10, date: new Date()};
    }

    $scope.save = function () {
        Expenses.save($scope.expense);
        $location.path('/');
    }
}]);