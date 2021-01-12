const CategoriesService = {
  getCategoriesByUserId(knex, userId) {
    return knex.select('*').from('categories').where({ user_id: userId });
  },
  insertCategory(knex, newCategory) {
    return knex.insert(newCategory).into('categories').returning('*');
  },
};

module.exports = CategoriesService;
