const express = require('express');

const router = express.Router();
const user = require('./commandController');

router
  .get('/:id', user.get)
  .get('/', user.get)
  .post('/id', user.post)
  .put('/', user.put);
  // .delete('/id', user.delete);

module.exports = router;
