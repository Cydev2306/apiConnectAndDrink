const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const item = require('../item/itemModel');

mongoose.connect('mongodb://localhost:27017/codrinkdb');
// ajouter item en require

const commandSchema = new mongoose.Schema({
  ref: { type: String, index: { unique: true } },
  username: { type: String, required: true },
  items: [item],
  total: { type: Number, required: true },
  user: { type: Number, required: true },
  statut: { type: String, required: true },
  date: { type: Date, default: Date.now },
  table: { type: String, required: true },
});

commandSchema.plugin(autoIncrement.plugin, { model: 'item', field: 'itemId' });

mongoose.model('command', commandSchema);
