var app = angular.module('expensesApp', ['ngRoute']);

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

app.controller('ExpensesViewController', ['$scope', function($scope){
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

    $scope.expenses = [
        {description:'food', amount: 10, date:'2014-10-01'},
        {description:'tickets', amount: 11, date:'2014-10-02'},
        {description:'food', amount: 12, date:'2014-10-03'},
        {description:'phone credit', amount: 13, date:'2014-10-04'},
        {description:'bills', amount: 14, date:'2014-10-05'},
        {description:'food', amount: 15, date:'2014-10-06'},
    ]
}]);

app.controller('HomeViewController', ['$scope', function($scope){
    $scope.appTitle = "Simple Expenses Tracker";
}]);

app.controller('ExpenseViewController', ['$scope', '$routeParams', function($scope, $routeParams){
    $scope.someText = 'The world is round. ID=' + $routeParams.id;
}]);