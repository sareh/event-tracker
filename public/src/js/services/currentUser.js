angular
  .module('event-tracker')
  .service('currentUser', CurrentUser);

CurrentUser.$inject = ['tokenService'];

function CurrentUser(tokenService){

  var self  = this;
  self.user = {};

  self.saveUser = function(user){
    self.user = user;
  }

  self.getUser = function(){
    return self.user;
  }

  self.clearUser = function(){
    return self.user = {};
  }

}