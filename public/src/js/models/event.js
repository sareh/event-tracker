angular
  .module('event-tracker')
  .factory('event', Event)

Event.$inject = ['API', '$resource'];

function Event(API, $resource) {

  return $resource(
    API + '/events/:id',
    {id: '@id'},
    { 
      'query':     { method: 'GET', isArray: false},
      'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'update':    { method: 'PUT' },
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );

}