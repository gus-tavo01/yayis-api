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
  userId: { type: Schema.Types.ObjectId, required: true },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

ListSchema.plugin(mongoosePaginate);
ListSchema.plugin(mongooseNormalize);
TodoSchema.plugin(mongooseNormalize);

module.exports = model('List', ListSchema);
