angular
  .module('event-tracker')
  .service('authInterceptor',AuthInterceptor)

AuthInterceptor.$inject = ['API', 'tokenService'];

function AuthInterceptor(API, tokenService) {
  return {
    request: function(config){
      var token = tokenService.getToken();

      if (config.url.indexOf(API) === 0 && token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    response: function(res){
      if (res.config.url.indexOf(API) === 0 && res.data.token) {
        tokenService.setToken(res.data.token);
      }
      return res;
    }
  }
}
