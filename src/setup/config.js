angular.module('wejay.player').config(function ($stateProvider, $urlRouterProvider) {
  /* Add New Routes Above */

  $stateProvider.state('home', {
    url:'/',
    templateUrl: 'partials/main/main.html'
  });
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
});