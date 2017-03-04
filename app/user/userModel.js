const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.Promise = global.Promise;
const connection = mongoose.connect('mongodb://localhost:27017/codrinkdb');
autoIncrement.initialize(connection);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  email: { type: String, trim: true, required: true },
  address: String,
  country: { type: String, trim: true },
  number: { type: String, trim: true },
});

userSchema.plugin(autoIncrement.plugin, { model: 'user', field: 'userId' });
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
