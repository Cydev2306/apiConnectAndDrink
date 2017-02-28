const UserModel = require('./userModel');

const user = {
  get: (req, res) => {
    console.log(req.params.id);
    UserModel.find({ id: req.params.id }, (err, users) => {
      if (err) throw err;
      // object of all the users
      res.json(users);
    });
  },
  post: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
  put: (req, res) => {
    console.log(req.params);
    UserModel({
      username: req.params.username,
      password: req.params.password,
      email: req.params.email,
      address: req.params.address ? req.params.address : '',
      country: req.params.country ? req.params.country : '',
      number: req.params.number ? req.params.number : '',
    }).save((err) => {
      if (err) res.json({ msg: err });
      else res.json(UserModel);
    });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
};
module.exports = user;
