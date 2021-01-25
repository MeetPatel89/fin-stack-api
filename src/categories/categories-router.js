const express = require('express');
const logger = require('../logger');
const CategoriesService = require('../categories-service');

const categoriesRouter = express.Router();
const bodyParser = express.json();

categoriesRouter
  .route('/api/categories/:userId')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    const { userId } = req.params;

    CategoriesService.getCategoriesByUserId(knexInstance, userId)
      .then((categories) => res.json(categories))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { category, type } = req.body;
    const { userId } = req.params;
    const newCategory = {
      category,
      type,
      user_id: userId,
    };
    if (!newCategory.user_id) {
      logger.error('User id is required');
      return res.status(400).send('Invalid data');
    }
    if (!newCategory.category) {
      logger.error('Category is required');
      return res.status(400).send('Invalid data');
    }
    if (!newCategory.type) {
      logger.error('Type is required');
      return res.status(400).send('Invalid data');
    }

    return CategoriesService.insertCategory(knexInstance, newCategory)
      .then((category) => res.status(201).json(category))
      .catch(next);
  });

module.exports = categoriesRouter;
