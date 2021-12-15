const { Schema, model } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseNormalize = require('@meanie/mongoose-to-json');

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  palette: {
    type: { type: String, required: true },
    primary: { type: String, required: true },
    secondary: { type: String, required: true },
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

ThemeSchema.plugin(mongoosePaginate);
ThemeSchema.plugin(mongooseNormalize);

module.exports = model('Theme', ThemeSchema);
