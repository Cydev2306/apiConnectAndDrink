const UserModel = require('./userModel');

const user = {
  get: (req, res) => {
    UserModel.find({ userId: req.params.id }, (err, users) => {
      if (err) res.status(500).send(err);
      else res.json(users);
    });
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
            res.json({ status: 'error', data: 'Ce nom d\'utilisateur est déjà utilisé !' });
            break;
          default: res.status(500).send(err);
            break;
        }
      } else res.json({ status: 'saved', data: usr.userId });
    });
  },
  put: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      UserModel.findOne({ userId: req.params.id }, (err, usr) => {
        if (err && !req.body) {
          res.status(500).send(err);
        } else {
          const currentuser = usr;
          currentuser.password = req.body.password || currentuser.password;
          currentuser.email = req.body.email || currentuser.email;
          currentuser.address = req.body.address || currentuser.address;
          currentuser.country = req.body.country || currentuser.country;
          currentuser.number = req.body.number || currentuser.number;
          currentuser.save((er, data) => {
            if (er) {
              res.status(500).send(er);
            }
            res.send(data);
          });
        }
      });
    } else {
      res.json({ status: 'error', data: 'Id manquant ou id est incorrect' });
    }
  },
  delete: (req, res) => {
    if (req.params.id && !isNaN(req.params.id)) {
      UserModel.findOneAndRemove({
        userId: req.params.id,
      }, (err, usr) => {
        if (err) { res.status(500).send(err); } else {
          res.json({
            status: (usr) ? 'deleted' : 'error',
            data: (usr) ? usr.userId : 'l\'user n\'existe pas',
          });
        }
      });
    } else {
      res.json({ status: 'error', data: 'Id manquant ou id est incorrect' });
    }
  },
};
module.exports = user;
