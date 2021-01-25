function makeTransactionsArray() {
  return [
    {
      id: 1,
      user_id: 1,
      category: 'First Category',
      type: 'expense',
      accounts: 'First Account',
      amount: 100.5,
      date_time: '2021-01-11T22:22:52.000Z',
    },
    {
      id: 2,
      user_id: 1,
      category: 'Second Category',
      type: 'balance',
      accounts: 'Second Account',
      amount: 200.5,
      date_time: '2021-01-02T22:22:52.000Z',
    },
    {
      id: 3,
      user_id: 2,
      category: 'Third Category',
      type: 'expense',
      accounts: 'Third Account',
      amount: 300.75,
      date_time: '2021-01-10T22:22:52.000Z',
    },
    {
      id: 4,
      user_id: 2,
      category: 'Fourth Category',
      type: 'balance',
      accounts: 'Fourth',
      amount: 500.88,
      date_time: '2021-01-08T22:22:52.000Z',
    },
  ];
}

module.exports = {
  makeTransactionsArray,
};
