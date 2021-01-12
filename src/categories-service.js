const CategoriesService = {
  getCategoriesByUserId(knex, userId) {
    return knex.select('*').from('categories').where({ user_id: userId });
  },
};

module.exports = CategoriesService;
