const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const utc = new Date();
utc.setHours(utc.getHours() + 2);
const commandSchema = new mongoose.Schema({
  ref: { type: String, index: { unique: true } },
  items: [{ type: Number, ref: 'item' }],
  total: { type: Number, required: true },
  user: { type: Number, ref: 'user', required: true },
  state: { type: String, required: true },
  date: { type: Date, default: utc },
  table: { type: String },
});

commandSchema.plugin(autoIncrement.plugin, { model: 'command', field: 'commandId' });

const commandModel = mongoose.model('command', commandSchema);

module.exports = commandModel;
