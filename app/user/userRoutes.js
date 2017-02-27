const express = require('express');

const router = express.Router();
const userController = require('./userController');
router
  .get('/:id', userController.get)
  .get('/', userController.get)
  .post('/id', userController.post)
  .put('/', userController.put)
  .delete('/id', userController.delete);

module.exports = router;
