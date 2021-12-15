const { Router } = require('express');
const controller = require('./controller');

const requireAuth = require('../../middlewares/requireAuth');

const router = Router()
  .get('/', controller.get)
  .post('/', requireAuth, controller.post)
  .patch('/:id', requireAuth, controller.patch)
  .delete(':id', requireAuth, controller.delete);

module.exports = router;
