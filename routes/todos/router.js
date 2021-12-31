const { Router } = require('express');
const todosController = require('./controller');

const router = Router({ mergeParams: true })
  .post('/', todosController.post)
  .patch('/:listId', todosController.patch)
  .delete('/:listId', todosController.delete);

module.exports = router;
