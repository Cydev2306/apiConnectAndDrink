const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const itemSchema = new mongoose.Schema({
  libelle: { type: String, required: true, index: { unique: true } },
  prix: { type: Number, required: true },
  description: { type: String },
  url: { type: String },
});

itemSchema.plugin(autoIncrement.plugin, { model: 'item', field: 'itemId' });

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;
