function makeCategoriesArray() {
  return [
    {
      id: 1,
      user_id: 1,
      category: 'First Category',
      type: 'expense',
    },
    {
      id: 2,
      user_id: 1,
      category: 'Second Category',
      type: 'balance',
    },
    {
      id: 3,
      user_id: 2,
      category: 'Third Category',
      type: 'expense',
    },
    {
      id: 4,
      user_id: 2,
      category: 'Fourth Category',
      type: 'balance',
    },
  ];
}

module.exports = {
  makeCategoriesArray,
};
