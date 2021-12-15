const { Router } = require('express');
const usersController = require('./controller');

const requireAuth = require('../../middlewares/requireAuth');

const router = Router()
  .post('/login', usersController.login)
  .put('/password', usersController.passwordReset)
  .post('/', usersController.post)
  .get('/', requireAuth, usersController.get)
  .patch('/:userId', requireAuth, usersController.patch)
  .delete('/:userId', requireAuth, usersController.delete);

module.exports = router;
