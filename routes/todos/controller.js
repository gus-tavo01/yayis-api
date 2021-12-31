const ListModel = require('../../models/List');

exports.post = async (req, res) => {
  // get list by id
  const { listId } = req.params;

  // TODO
  // Validate inputs
  // req.body, listId

  // Validate list exist
  const foundList = await ListModel.findById(listId);
  if (!foundList) return res.NotFound(`List '${listId}' is not found`);

  // Insert new todo
  foundList.todos.push(req.body);
  await foundList.save();

  // Return inserted todo
  const { id } = foundList.todos[foundList.todos.length - 1];
  const newTodo = { ...req.body, id };

  return res.Created(newTodo);
};

exports.patch = async (req, res) => {
  const { listId, todoId } = req.params;

  // TODO:
  // Validate inputs

  // Validate list exist
  const foundList = await ListModel.findById(listId);
  if (!foundList)
    return res.UnprocessableEntity(`List '${listId}' is not found`);

  // Validate todo exist
  const foundTodo = await foundList.todos.id(todoId);
  if (!foundTodo) return res.NotFound(`Todo '${todoId}' is not found`);

  // Update todo
  const updatedTodo = await foundTodo.set(req.body);
  await foundList.save();

  return res.Ok(updatedTodo);
};

exports.delete = async (req, res) => {
  const { listId, todoId } = req.params;

  // TODO
  // Validate inputs

  // Validate list exist
  const foundList = await ListModel.findById(listId);
  if (!foundList)
    return res.UnprocessableEntity(`List '${listId}' does not exist`);

  // Validate todo exist
  const foundTodo = await foundList.todos.id(todoId);
  if (!foundTodo) return res.NotFound(`Todo '${todoId}'is not found`);

  // Remove item
  await foundList.todos.id(todoId).remove();
  await foundList.save();

  return res.Ok(foundTodo);
};
