const { Router } = require('express');
const themesController = require('./controller');

const requireAuth = require('../../middlewares/requireAuth');

const router = Router()
  .get('/', themesController.get)
  .post('/', requireAuth, themesController.post)
  .patch('/:id', requireAuth, themesController.patch)
  .delete(':id', requireAuth, themesController.delete);

module.exports = router;
