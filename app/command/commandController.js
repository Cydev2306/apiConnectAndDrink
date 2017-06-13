const CommmandModel = require('./commandModel');
const shortid = require('shortid');
const itemModel = require('../item/itemModel');

exports.get = (req, res) => {
  if (req.params.id) {
    CommmandModel.findOne({ commandId: req.params.id }, (err, cmds) => {
      if (err || !cmds) res.status(400).send(err || { error: 'NotFind' });
      else res.json(cmds);
    }).select('-__v');
  } else {
    CommmandModel.find({}, (err, cmd) => {
      if (err) res.status(500).send({ error: 'UnknowError' });
      else res.json(cmd);
    }).select('-__v');
  }
};
exports.post = (req, res) => {
  const myItems = JSON.parse(req.body.items);
  const getItems = () =>
    new Promise((resolve, reject) => {
      itemModel.find({
        itemId: { $in: myItems },
      }, (er, docs) => {
        if (er) {
          reject(er);
        } else {
          resolve(docs);
        }
      });
    });
  getItems().then((itemsSelected) => {
    let total = 0;
    total = myItems.map((item) => {
      const result = itemsSelected.find(d => d.itemId === item);
      return result.prix;
    }).reduce((a, b) => parseFloat(a) + parseFloat(b));
    CommmandModel({
      ref: shortid.generate(),
      items: myItems,
      total,
      user: req.body.user,
      state: 'paye',
      table: null,
    }).save((err, cmd) => {
      if (err) {
        res.status(500).send({ error: 'UnknowError' });
      } else res.json({ status: 'saved', idCommand: cmd.commandId });
    });
  });
};

exports.put = (req, res) => {
  if (req.params.id && !isNaN(req.params.id)) {
    CommmandModel.findOne({ commandId: req.params.id }, (err, cmd) => {
      if (err && !req.body) {
        res.status(500).send(err);
      } else {
        const currentitem = cmd;
        // ref: req.body.ref,
        // items: req.body.items,
        // total: req.body.total,
        // state: req.body.state,
        // table: req.body.table,
        currentitem.ref = req.body || currentitem.ref;
        currentitem.items = req.body.items || currentitem.items;
        currentitem.state = req.body.state || currentitem.state;
        currentitem.url = req.body.url || currentitem.url;
        currentitem.save((er) => {
          if (er) {
            res.status(500).send({ error: 'UnknowError' });
          }
          res.send({ status: 'updated', idItem: cmd.commandId });
        });
      }
    });
  } else {
    res.status(400).json({ status: 'error', data: 'Id manquant ou id est incorrect' });
  }
};
