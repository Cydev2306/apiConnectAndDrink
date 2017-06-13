const UserModel = require('./userModel');

const user = {
  get: (req, res) => {
    if (req.params.id) {
      UserModel.findOne({ userId: req.params.id }, (err, users) => {
        if (err || !users) res.status(400).send(err || { error: 'NotFind' });
        else res.json(users);
      }).select('-_id -__v -password');
    } else {
      UserModel.find({}, (err, users) => {
        if (err) res.status(500).send({ error: 'UnknowError' });
        else res.json(users);
      }).select('-__v -password');
    }
  },
  post: (req, res) => {
    UserModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      address: req.body.address || '',
      country: req.body.country || '',
      number: req.body.number || '',
    }).save((err, usr) => {
      if (err) {
        // erreur param existe déjà
        switch (err.name) {
          case 'MongoError':
            res.status(400).send({ status: 'error', data: 'Ce nom d\'utilisateur est déjà utilisé !' });
            break;
          default: res.status(500).send({ error: 'UnknowError' });
            break;
        }
      } else res.json({ status: 'saved', idUser: usr.userId });
    });
  },
  put: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      UserModel.findOne({ userId: req.params.id }, (err, usr) => {
        if (err && !req.body) {
          res.status(500).send({ error: 'UnknowError' });
        } else {
          const currentuser = usr;
          currentuser.password = req.body.password || currentuser.password;
          currentuser.email = req.body.email || currentuser.email;
          currentuser.address = req.body.address || currentuser.address;
          currentuser.country = req.body.country || currentuser.country;
          currentuser.number = req.body.number || currentuser.number;
          currentuser.save((er) => {
            if (er) {
              res.status(500).send({ error: 'UnknowError' });
            } else res.send({ status: 'updated', idUser: usr.userId });
          });
        }
      });
    } else {
      res.status(400).json({ status: 'error', data: 'Id manquant ou id est incorrect' });
    }
  },
  delete: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      UserModel.findOneAndRemove({
        userId: req.params.id,
      }, (err, usr) => {
        if (err) { res.status(500).send({ error: 'UnknowError' }); } else {
          res.status((usr) ? 200 : 400).send((usr) ? { status: 'deleted', userId: usr.userId } : { status: 'error', data: 'Id manquant ou id est incorrect' });
        }
      });
    } else {
      res.status(400).send({ status: 'error', data: 'Id manquant ou id est incorrect' });
    }
  },
};
module.exports = user;
