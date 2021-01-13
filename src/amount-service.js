const AmountService = {
    getAmountByUserId(knex, userId) {
        return knex.select('*').from('amount').where({user_id: userId})
    }
}

module.exports = AmountService;