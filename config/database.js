const mongoose = require('mongoose');

module.exports = {
  connect: async () => mongoose.connect(process.env.DB_CONNECTION),
  disconnect: async () => mongoose.disconnect(),
};
