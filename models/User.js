const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseNormalize = require('@meanie/mongoose-to-json');

const UserConfigurationSchema = new Schema({
  themeId: Schema.Types.ObjectId,
  languageId: Schema.Types.ObjectId,
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  configuration: UserConfigurationSchema,
  createDate: {
    type: Date,
    required: false,
    default: Date.now,
  },
  isDisabled: Boolean,
  type: {
    type: String,
    required: false,
    default: 'regular',
  },
});

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseNormalize);

module.exports = model('User', UserSchema);
