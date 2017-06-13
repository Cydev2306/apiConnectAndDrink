const ItemModel = require('./itemModel');

const item = {
  get: (req, res) => {
    if (req.params.id) {
      ItemModel.findOne({ itemId: req.params.id }, (err, items) => {
        if (err || !items) res.status(400).send(err || { error: 'NotFind' });
        else res.json(items);
      }).select('-__v');
    } else {
      ItemModel.find({}, (err, users) => {
        if (err) res.status(500).send({ error: 'UnknowError' });
        else res.json(users);
      }).select('-__v');
    }
  },
  post: (req, res) => {
    ItemModel({
      libelle: req.body.libelle,
      prix: req.body.prix,
      description: req.body.description || '',
      url: req.body.url || '',
    }).save((err, itm) => {
      if (err) {
        // erreur param existe déjà
        switch (err.name) {
          case 'MongoError':
            res.status(400).send({ status: 'error', data: 'Ce nom de produit déjà utilisé !' });
            break;
          default: res.status(500).send({ error: 'UnknowError' });
            break;
        }
      } else res.json({ status: 'saved', idItem: itm.itemId });
    });
  },
  put: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      ItemModel.findOne({ itemId: req.params.id }, (err, itm) => {
        if (err && !req.body) {
          res.status(500).send(err);
        } else {
          const currentitem = itm;
          currentitem.libelle = req.body.libelle || currentitem.libelle;
          currentitem.prix = req.body.prix || currentitem.prix;
          currentitem.description = req.body.description || currentitem.description;
          currentitem.url = req.body.url || currentitem.url;
          currentitem.save((er) => {
            if (er) {
              res.status(500).send({ error: 'UnknowError' });
            }
            res.send({ status: 'updated', idItem: itm.itemId });
          });
        }
      });
    } else {
      res.status(400).json({ status: 'error', data: 'Id manquant ou id est incorrect' });
    }
  },
  delete: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      ItemModel.findOneAndRemove({
        itemId: req.params.id,
      }, (err, itm) => {
        if (err) { res.status(500).send({ error: 'UnknowError' }); } else {
          res.status((itm) ? 200 : 400).send((itm) ? { status: 'deleted', itemId: itm.itemId } : { status: 'error', data: 'Id manquant ou l\'id est incorrect' });
        }
      });
    } else {
      res.status(400).send({ status: 'error', data: 'Id manquant ou l\'id est incorrect' });
    }
  },
};

module.exports = item;
