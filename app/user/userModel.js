const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codrinkdb');
const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  email: { type: String, trim: true, required: true },
  adress: String,
  country: { type: String, trim: true },
  number: { type: String, trim: true },

});
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
