const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codrinkdb');
const itemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  libelle: { type: String, required: true },
  prix: { type: Number, required: true },
  description: { type: String },

});
mongoose.model('item', itemSchema);
