const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const jwt = require('express-jwt');
const cors = require('cors')

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');

// Connection URL
const db = mongoose.connect(config.database);
autoIncrement.initialize(db);

const app = express();
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
// routes
const user = require('./app/user/userRoutes');
const item = require('./app/item/itemRoutes');
const command = require('./app/command/commandRoutes');
const auth = require('./app/auth/authRoute');

// Middlewares
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });
app.use(cors());
app.use(morgan('combined', { stream: accessLogStream }));
// log requests

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', user)
   .use('/api/item', item)
   .use('/api/command', command)
   .use('/api/doc', express.static(path.join(__dirname, '/public')))
   .use('/', auth)

   .use(jwt({ secret: config.secret }).unless({ path: ['/api/doc', '/authenticate', { url: '/api/user', methods: 'POST' }] }))
   .use((err, req, res, next) => {
     if (err.name === 'UnauthorizedError') {
       res.status(err.status).send({ message: err.message });
       return;
     }
     const error = new Error('Not Found');
     error.status = 404;
     next(error);
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
