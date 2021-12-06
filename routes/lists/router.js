const { Router } = require('express');
const listsController = require('./controller');

const router = Router()
  .get('/', listsController.get)
  .post('/', listsController.post)
  .patch('/:listId', listsController.patch)
  .delete('/:listId', listsController.delete);

module.exports = router;
