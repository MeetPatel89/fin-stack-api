const AccountsService = {
    getAccountsByUserId(knex, userId) {
        return knex.select('*').from('accounts').where({user_id: userId})
    }
}

module.exports = AccountsService;