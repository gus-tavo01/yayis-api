const { Schema, model } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseNormalize = require('@meanie/mongoose-to-json');

const TodoSchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    maxlength: 500,
  },
  isDone: Boolean,
});

const ListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  todos: [TodoSchema],
});

ListSchema.plugin(mongoosePaginate);
ListSchema.plugin(mongooseNormalize);

module.exports = model('List', ListSchema);
