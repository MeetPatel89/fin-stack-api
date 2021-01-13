const TransactionsService = {
    getTransactionsByUserId(knex, userId) {
        return knex.select('*').from('transactions').where({user_id: userId})
    }
}

module.exports = TransactionsService;