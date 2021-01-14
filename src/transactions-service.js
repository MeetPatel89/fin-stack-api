const TransactionsService = {
    getTransactionsByUserId(knex, userId) {
        return knex.select('*').from('transactions').where({user_id: userId})
    },
    insertTransactions(knex, newTransaction) {
        return knex.insert(newTransaction).into('transactions').returning('*');
    }
}

module.exports = TransactionsService;