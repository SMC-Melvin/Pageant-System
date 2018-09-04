angular.module('PageantSystem')
.config(['$stateProvider','$urlRouterProvider','$qProvider',function($stateProvider,$urlRouterProvider,$qProvider) {
    
    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get('$state');
        return $state.go('home');
    });

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'assets/app/template/main.html'
    });

    $qProvider.errorOnUnhandledRejections(false);
}]);
