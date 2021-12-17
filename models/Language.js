const { Schema, model } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseNormalize = require('@meanie/mongoose-to-json');

const LanguageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

LanguageSchema.plugin(mongoosePaginate);
LanguageSchema.plugin(mongooseNormalize);

module.exports = model('Language', LanguageSchema);
