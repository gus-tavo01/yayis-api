const { Schema, model } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseNormalize = require('@meanie/mongoose-to-json');

const ColorSchema = new Schema(
  {
    light: String,
    main: String,
    dark: String,
    contrastText: String,
  },
  { _id: false }
);
const PaletteScheme = new Schema(
  {
    primary: ColorSchema,
    secondary: ColorSchema,
    type: { type: String, default: 'light' },
  },
  { _id: false }
);

const ThemeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  palette: {
    type: PaletteScheme,
    required: true,
  },
  code: { type: String, required: true },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

ThemeSchema.plugin(mongoosePaginate);
ThemeSchema.plugin(mongooseNormalize);

module.exports = model('Theme', ThemeSchema);
