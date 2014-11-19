angular.module('spotify-web-app').config(function ($stateProvider, $urlRouterProvider) {
  /* Add New Routes Above */
  
  // For any unmatched url, redirect to /
  $urlRouterProvider.otherwise('/');
});