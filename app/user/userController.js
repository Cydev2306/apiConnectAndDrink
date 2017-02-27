const UserModel = require('./userModel');

const user = {
  get: (req, res) => {
    console.log(req.params.id);
      UserModel.find({req.params.id}, (err, users) => {
        if (err) throw err;
        // object of all the users
        res.json({ data: req.query.id });
});
    }
  },
  post: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
  put: (req, res) => {
    UserModel({
      username: 'cyril',
      password: 'cyril',
      email: 'charlier.cy@gmail.com',
      adress: 'test test',
      country: 'Roubaix',
      number: '0787931502',
    }).save((err) => {
      if (err) throw err;

      console.log('User created!');
    });
    res.json({ data: 'test' });
  },
  delete: (req, res) => {
    console.log(req.params.id);
    res.json({ data: req.query.id });
  },
};
module.exports = user;
