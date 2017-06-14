const express = require('express');

const router = express.Router();
// rework
const cmd = require('./commandController');

router
/**
 * @api {get} /command/:id Get One
 * @apiName GetCommand
 * @apiGroup Command
 *
 * @apiParam {Number} id de la commande.
 *
 * @apiSuccess {Int} commandId Id de la commande.
 * @apiSuccess {String} libelle  libelle de l'item.
 * @apiSuccess {String} prix  prix de l'item.
 * @apiSuccess {String} description description de l'item
 * @apiSuccess {String} url  url de l'image
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "itemId": 0,
 *      "libelle": "mojito",
 *      "prix": 6.5,
 *      "description": "Le plus classique des coctails ",
 *      "url": "/test/example",
 *     }
 *
 * @apiError NotFind id de l'utilisateur non trouvé.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NotFind"
 *     }
 */
  .get('/:id', cmd.get)
  /**
   * @api {get} /item Get All
   * @apiName GetItems
   * @apiGroup Command
   *
   * @apiSuccess {Object[]} commands    Liste des commandes.
   *
   * @apiError CommandNotFound No item left.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Not Found
   *     {
   *       "error": "UnknowError"
   *     }
   */
  .get('/', cmd.get)
  /**
   * @api {post} /command Post
   * @apiName Postcommand
   * @apiGroup Command
   *
   * @apiSuccess {Int} cmdId Id de l'utilisateur.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "saved",
   *      "commandId": 0
   *     }
   */
  .post('/', cmd.post)
  /**
   * @api {put} /command Put
   * @apiName PutCommand
   * @apiGroup Command
   * @apiParam {items} array d'items.
   * @apiParam {table} numero de la table.
   * @apiParam {Number} id de la commande.
   * @apiSuccess {Int} commandId Id de la commande.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "updated",
   *      "commandId": 0
   *     }
   *
   * @apiError error Id manquant ou id est incorrect
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Item error
   *     {
   *        status: 'error',
   *        data: 'Id manquant ou id est incorrect'
   *     }
   */
  .put('/', cmd.put)
  .delete('/:id', cmd.delete);
module.exports = router;
