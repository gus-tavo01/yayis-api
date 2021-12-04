const { Router } = require('express');
const listsController = require('./controller');

const router = Router()
  .get('/', listsController.get)
  .post('/', listsController.post)
  .patch('/:id', listsController.patch)
  .delete(':id', listsController.delete);

module.exports = router;
