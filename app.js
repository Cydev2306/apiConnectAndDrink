const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');
// Connection URL
const db = mongoose.connect('mongodb://localhost:27017/codrinkdb');
autoIncrement.initialize(db);

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
// routes
const user = require('./app/user/userRoutes');
const item = require('./app/item/itemRoutes');

// Middlewares
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });

app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', user);
app.use('/item', item);

// using arrow syntax
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});
app.listen(port);
