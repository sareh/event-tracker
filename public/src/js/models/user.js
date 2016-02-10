angular
  .module('event-tracker')
  .factory('user', User)

User.$inject = ['API', '$resource'];

function User(API, $resource) {

  return $resource(
    API + '/users/:id',
    {id: '@id'},
    { 
      'query':     { method: 'GET', isArray: false},
      'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'update':    { method: 'PUT' },
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register':  { method: 'POST', 
                     url: API +'/register' 
    },
    'login': { url: API + '/login',
               method: "POST"
             }
    }
  );

}