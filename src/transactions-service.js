const TransactionsService = {
    getTransactionsByUserId(knex, userId) {
        return knex.select('*').from('transactions').where({user_id: userId})
    },
    insertTransactions(knex, newTransaction) {
        return knex.insert(newTransaction).into('transactions').returning('*');
    },
    deleteTransactionsById(knex, id) {
        return knex.from('transactions').where({id}).delete().returning('*')
    },
    updateTransactionById(knex, id, newTransaction) {
        return knex.from('transactions').where({id}).update(newTransaction).returning('*');
    }
}

module.exports = TransactionsService;