const express = require('express');

const router = express.Router();
const item = require('./itemController');

router
/**
 * @api {get} /item/:id Get One
 * @apiName GetItem
 * @apiGroup Item
 *
 * @apiParam {Number} id de l'item.
 *
 * @apiSuccess {Int} itemId Id de l'item.
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
  .get('/:id', item.get)
  /**
   * @api {get} /item Get All
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiSuccess {Object[]} items       Liste des items.
   *
   * @apiError ItemNotFound No item left.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 500 Not Found
   *     {
   *       "error": "UnknowError"
   *     }
   */
  .get('/', item.get)
  /**
   * @api {post} /item Post
   * @apiName PostItem
   * @apiGroup Item
   *
   * @apiSuccess {Int} itemId Id de l'item.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "saved",
   *      "idItem": 0
   *     }
   * @apiError error le libelle de l'item est déjà prit
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 400 Item exist
   *     {
   *        status: 'error',
   *        data: 'Ce nom de produit déjà utilisé !'
   *     }
   */
  .post('/', item.post)
  /**
   * @api {put} /item/:id Put
   * @apiName PutItem
   * @apiGroup Item
   *
   * @apiSuccess {Int} itemId Id du produit.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "updated",
   *      "idItem": 0
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
  .put('/:id', item.put)
  /**
   * @api {delete} /item/:id Delete
   * @apiName DeleteItem
   * @apiGroup Item
   *
   * @apiSuccess {Int} itemId Id de l'utilisateur.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *      "status": "deleted",
   *      "idItem": 0
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
  .delete('/:id', item.delete);

module.exports = router;
