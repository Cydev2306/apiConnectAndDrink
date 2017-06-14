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
  if (req.params.user) {
    CommmandModel.find({ user: req.params.user }, (err, cmd) => {
      if (err) res.status(500).send({ error: 'UnknowError' });
      else res.json(cmd);
    }).select('-__v');
  }
};
const getItems = myItems =>
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
exports.post = (req, res) => {
  const myItems = JSON.parse(req.body.items);

  getItems(myItems).then((itemsSelected) => {
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
  if (req.body && req.body.id && !isNaN(req.body.id)) {
    const myItems = JSON.parse(req.body.items);
    CommmandModel.findOne({ commandId: req.body.id }, (err, cmd) => {
      getItems(myItems).then((itemsSelected) => {
        const totalPut = myItems.map((item) => {
          const result = itemsSelected.find(d => d.itemId === item);
          return result.prix;
        }).reduce((a, b) => parseFloat(a) + parseFloat(b));
        const currentcmd = cmd;
        currentcmd.items = myItems || currentcmd.items;
        currentcmd.total = totalPut;
        currentcmd.table = req.body.table || currentcmd.table;
        if (currentcmd.state === 'paye' && currentcmd.table !== null) {
          currentcmd.state = 'en cours de preparation';
        } else if (req.body.check === 'true') {
          currentcmd.state = '';
        }

        currentcmd.save((er) => {
          if (er) {
            res.status(500).send({ error: 'UnknowError' });
          } else {
            res.send({ status: 'updated', idCommand: cmd.commandId });
          }
        });
      });
    });
  } else {
    res.status(400).json({ status: 'error', data: 'Id manquant ou id est incorrect' });
  }
};
exports.delete = (req, res) => {
  if (req.params.id && !isNaN(req.params.id)) {
    CommmandModel.findOneAndRemove({
      commandId: req.params.id,
    }, (err, cmd) => {
      if (err) { res.status(500).send({ error: 'UnknowError' }); } else {
        res.status((cmd) ? 200 : 400).send((cmd) ? { status: 'deleted', commandId: cmd.userId } : { status: 'error', data: 'Id manquant ou id est incorrect' });
      }
    });
  } else {
    res.status(400).send({ status: 'error', data: 'Id manquant ou id est incorrect' });
  }
};
