const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeTransactionsArray } = require('./transactions.fixtures');

describe('Transactions Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from database', () => db.destroy());

  before('clean the users table', () => db('users').delete());
  before('clean the transactions table', () => db('transactions').delete());

  context('Given there are transactions in the database', () => {
    const testUsers = makeUsersArray();
    const testTransactions = makeTransactionsArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    beforeEach('insert transactions', () => {
      return db.into('transactions').insert(testTransactions);
    });

    afterEach('cleanup users table', () => db('users').delete());
    afterEach('cleanup transactions table', () => db('transactions').delete());

    describe('GET /api/transactions', () => {
      it('GET /api/transactions responds with 200 and all the transactions', () => {
        return supertest(app).get('/api/transactions').expect(200);
      });
    });

    describe('GET /api/transactions/:userId', () => {
      it('GET /api/transactions/:userId responds with 200 and transactions bu user_id', () => {
        const userId = 2;
        return supertest(app).get(`/api/transactions/${userId}`).expect(200);
      });
    });

    describe('POST /api/transactions/:userId', () => {
      it('POST /api/transactions/:userId responds with 201 and the newly created transaction', () => {
        const userId = 2;
        const newTransaction = {
          id: 5,
          category: 'New Category',
          type: 'expense',
          accounts: 'New Account',
          amount: 250.55,
          date_time: '2021-01-11T07:27:00.000Z',
        };
        return supertest(app)
          .post(`/api/transactions/${userId}`)
          .send(newTransaction)
          .expect(201)
          .expect((res) => {
            expect(res.body[0].category).to.eql(newTransaction.category);
            expect(res.body[0].user_id).to.eql(userId);
            expect(res.body[0].type).to.eql(newTransaction.type);
            expect(res.body[0].accounts).to.eql(newTransaction.accounts);
            expect(parseFloat(res.body[0].amount)).to.eql(
              newTransaction.amount
            );
            expect(res.body[0].date_time).to.eql(newTransaction.date_time);
            expect(res.body[0]).to.have.property('id');
          });
      });
    });

    describe('DELETE /api/transactions/:id', () => {
      it('DELETE /api/transactions/:id responds with 204 and removes the transaction', () => {
        const idToRemove = 2;
        const filteredTransactions = testTransactions.filter(
          (transaction) => transaction.id !== idToRemove
        );
        const remainingTransactions = filteredTransactions.map(
          (transaction) => {
            const amount = transaction.amount.toFixed(2);
            return Object.assign(transaction, { amount });
          }
        );
        return supertest(app)
          .delete(`/api/transactions/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get('/api/transactions')
              .expect(remainingTransactions)
          );
      });
    });

    describe('PATCH /api/transactions/:id', () => {
      it('PATCH /api/transactions/:id responds with 201 and newly edited transaction', () => {
        const idToEdit = 2;
        const editedTransaction = {
          category: 'Entirely random category',
          date_time: '2030-01-02T22:22:52.000Z',
        };
        return supertest(app)
          .patch(`/api/transactions/${idToEdit}`)
          .send(editedTransaction)
          .expect(201)
          .then((res) => {
            expect(res.body[0].category).to.eql(editedTransaction.category);
            expect(res.body[0].date_time).to.eql(editedTransaction.date_time);
            expect(res.body[0].id).to.eql(idToEdit);
          });
      });
    });
  });
});
