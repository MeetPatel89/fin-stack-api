const express = require('express');
const logger = require('../logger');
const CategoriesService = require('../categories-service');

const categoriesRouter = express.Router();
const bodyParser = express.json();

categoriesRouter.route('/api/categories/:userId').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  const { userId } = req.params;

  CategoriesService.getCategoriesByUserId(knexInstance, userId)
    .then((categories) => res.json(categories))
    .catch(next);
});

module.exports = categoriesRouter;
