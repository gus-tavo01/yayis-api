const { Router } = require('express');
const todosController = require('./controller');

const router = Router({ mergeParams: true })
  .post('/', todosController.post)
  .patch('/:todoId', todosController.patch)
  .delete('/:todoId', todosController.delete);

module.exports = router;
