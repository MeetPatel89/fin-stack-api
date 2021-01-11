const AccountsService = {
    getAccountsByUserId(knex, userId) {
        return knex.select('*').from('accounts').where({user_id: userId})
    },
    insertAccount(knex, newAccount) {
        return knex.insert(newAccount).into('accounts').returning('*');
    }
}

module.exports = AccountsService;