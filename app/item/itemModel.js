const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

mongoose.connect('mongodb://localhost:27017/codrinkdb');
const itemSchema = new mongoose.Schema({
  libelle: { type: String, required: true, index: { unique: true } },
  prix: { type: Number, required: true },
  description: { type: String },
  url: { type: String },
});

itemSchema.plugin(autoIncrement.plugin, { model: 'item', field: 'itemId' });

mongoose.model('item', itemSchema);
