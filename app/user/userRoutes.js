const express = require('express');

const router = express.Router();
const userController = require('./userController');

router
/**
 * @api {get} /user/:id Get One
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id de l'utilisateur.
 *
 * @apiSuccess {Int} userId Id de l'utilisateur.
 * @apiSuccess {String} username  Nom d'utilisateur.
 * @apiSuccess {String} email  Email de l'utilisateur.
 * @apiSuccess {String} address  Addresse de l'utilisateur.
 * @apiSuccess {String} country  Ville de l'utilisateur.
 * @apiSuccess {String} number  Numero de l'utilisateur.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "userId": 5,
 *      "username": "tata",
 *      "email": "tot@test.fr",
 *      "address": "1 rue d'exemple",
 *      "country": "Paris",
 *      "number": "0102030405"
 *     }
 *
 * @apiError NotFind id de l'utilisateur non trouvé.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFind"
 *     }
 */
  .get('/:id', userController.get)
  /**
   * @api {get} /user Get All
   * @apiName GetUsers
   * @apiGroup User
   *
   * @apiSuccess {Object[]} utilisateurs       Liste des utilisateurs.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "userId": 5,
   *      "username": "tata",
   *      "email": "tot@test.fr",
   *      "address": "1 rue d'exemple",
   *      "country": "Paris",
   *      "number": "0102030405"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Not Found
   *     {
   *       "error": "UnknowError"
   *     }
   */
  .get('/', userController.get)
  /**
   * @api {post} /user Post
   * @apiName PostUser
   * @apiGroup User
   *
   * @apiSuccess {Int} userId Id de l'utilisateur.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "saved",
   *      "idUser": 0
   *     }
   * @apiError error l'username est déjà prit
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 User exist
   *     {
   *        status: 'error',
   *        data: 'Ce nom d\'utilisateur est déjà utilisé !'
   *     }
   */
  .post('/', userController.post)
  /**
   * @api {put} /user Put
   * @apiName PutUser
   * @apiGroup User
   *
   * @apiSuccess {Int} userId Id de l'utilisateur.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "updated",
   *      "idUser": 0
   *     }
   *
   * @apiError error Id manquant ou id est incorrect
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 User error
   *     {
   *        status: 'error',
   *        data: 'Id manquant ou id est incorrect'
   *     }
   */
  .put('/:id', userController.put)
  /**
   * @api {delete} /user Delete
   * @apiName DeleteUser
   * @apiGroup User
   *
   * @apiSuccess {Int} userId Id de l'utilisateur.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "deleted",
   *      "idUser": 0
   *     }
   *
   * @apiError error Id manquant ou id est incorrect
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 User error
   *     {
   *        status: 'error',
   *        data: 'Id manquant ou id est incorrect'
   *     }
   */
  .delete('/:id', userController.delete);

module.exports = router;
