const { Router } = require('express');
const usersController = require('./controller');

const requireAuth = require('../../middlewares/requireAuth');

const router = Router()
  .post('/', requireAuth, usersController.post)
  .post('/login', usersController.login)
  .get('/', requireAuth, usersController.get)
  .patch('/:id', requireAuth, usersController.patch)
  .delete(':id', requireAuth, usersController.delete);

module.exports = router;
