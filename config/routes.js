var express  = require('express');
var passport = require('passport');
var router   = express.Router();

var authenticationsController = require('../controllers/authenticationsController');
var usersController = require('../controllers/usersController');
var eventsController = require('../controllers/eventsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/users')
  .get(usersController.usersIndex)

router.route('/users/:id')
  .get(usersController.usersShow)
  .put(usersController.usersUpdate)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete)

router.route('/events')
  .get(eventsController.eventsIndex)
  .post(eventsController.eventsCreate)

router.route('/events/:id')
  .get(eventsController.eventsShow)
  .put(eventsController.eventsUpdate)
  .patch(eventsController.eventsUpdate)
  .delete(eventsController.eventsDelete)

module.exports = router;