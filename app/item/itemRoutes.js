const express = require('express');

const router = express.Router();
const item = require('./itemController');

router
  .get('/:id', item.get)
  .get('/', item.get)
  .post('/id', item.post)
  .put('/', item.put)
  .delete('/id', item.delete);

module.exports = router;
