angular
  .module('event-tracker', ['angular-jwt', 'ngResource', 'ui.router'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor')
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'register.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'profile.html'
  })

  $urlRouterProvider.otherwise('/');
}
