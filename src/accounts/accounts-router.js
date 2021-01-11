const express = require('express');
const AccountsService = require('../accounts-service');

const accountsRouter = express.Router();
const bodyParser = express.json();

accountsRouter
    .route('/api/accounts/:userId')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db');
        const { userId } = req.params;
        AccountsService.getAccountsByUserId(knexInstance, userId)
            .then(accounts => res.json(accounts))
            .catch(next);
    })

module.exports = accountsRouter;