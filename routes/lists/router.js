const { Router } = require('express');
const listsController = require('./controller');

// Middlewares
// TODO: auth middleware

const router = Router()
  .get('/', listsController.get)
  .post('/', listsController.post)
  .patch('/:id', listsController.patch)
  .delete(':id', listsController.delete);

module.exports = router;
