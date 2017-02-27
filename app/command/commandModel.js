const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codrinkdb');
// ajouter item en require

const commandSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.ObjectId, auto: true },
  username: { type: String, required: true, index: { unique: true } },
  items: [item],
  total: { type: Number, required: true },
  user: { type: Number, required: true },
  statut: { type: String, required: true },
  date: { type: Date, default: Date.now },
  table: { type: String, required: true },
});
mongoose.model('command', commandSchema);
