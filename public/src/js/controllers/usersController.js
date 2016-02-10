angular
  .module('event-tracker')
  .controller('usersController', UsersController);

UsersController.$inject = ['User', 'tokenService', 'currentUser', '$state'];
function UsersController(User, tokenService, currentUser, $state) {

  var self     = this;
  self.all     = [];
  self.user    = {};
  self.oneUser = {};

  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.getUsers      = getUsers;

  function register() {
    User.register(self.user, handleLogin);
  }

  function login() {
    User.login(self.user, handleLogin);
  }

  function handleLogin(res) {
    var token = res.token || null;
    if (token) {
      // console.log("Logging In");
      $state.go('event');
    }
    // console.log(res);
    self.user = tokenService.decodeToken();
    currentUser.saveUser(self.user)
  }
  function logout() {
    tokenService.removeToken();
    self.all  = [];
    self.user = {};
    currentUser.clearUser();
  }

  function checkLoggedIn() {
    return !!tokenService.getToken();
  }

  function getUsers() {
    User.query(function(data){
     return self.all = data.users;
   });
  }

  // Check user is logged in every time page is loaded
  if (currentUser.getUser()) {
    self.user = tokenService.decodeToken();
    // console.log(self.user);
  }
  return self;
}