function makeAccountsArray() {
  return [
    {
      id: 1,
      accounts: 'First Bank',
      user_id: 2,
    },
    {
      id: 2,
      accounts: 'Second Bank',
      user_id: 2,
    },
    {
      id: 3,
      accounts: 'Third Bank',
      user_id: 1,
    },
    {
      id: 4,
      accounts: 'Fourth Bank',
      user_id: 1,
    },
  ];
}

module.exports = {
  makeAccountsArray,
};
