const { Router } = require('express');
const themesController = require('./controller');

const requireAuth = require('../../middlewares/requireAuth');

const router = Router()
  .get('/', themesController.get)
  .post('/', requireAuth, themesController.post)
  .patch('/:themeId', requireAuth, themesController.patch)
  .delete('/:themeId', requireAuth, themesController.delete);

module.exports = router;
