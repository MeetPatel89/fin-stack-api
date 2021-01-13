const express = require('express');
const logger = require('../logger');
const TransactionsService = require('../transactions-service');

const transactionsRouter = express.Router();
const bodyParser = express.json();

transactionsRouter
    .route('/api/transactions/:userId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { userId } = req.params;

        TransactionsService.getTransactionsByUserId(knexInstance, userId)
            .then(transactions => res.json(transactions))
            .catch(next);
    })

module.exports = transactionsRouter;