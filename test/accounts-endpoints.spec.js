const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeAccountsArray } = require('./accounts.fixtures');

describe('Accounts Endpoints', () => {
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
  before('clean the accounts table', () => db('accounts').delete());

  context('Given there are accounts in the database', () => {
    const testUsers = makeUsersArray();
    const testAccounts = makeAccountsArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    beforeEach('insert accounts', () => {
      return db.into('accounts').insert(testAccounts);
    });

    afterEach('cleanup users', () => db('users').delete());

    afterEach('cleanup accounts', () => db('accounts').delete());

    describe('GET /api/accounts/:userId', () => {
      it('GET /api/accounts/:userId responds with 200 and the account specified by user id', () => {
        const idToGet = 2;
        const specifiedAccount = testAccounts.filter(
          (account) => account.user_id === idToGet
        );
        return supertest(app)
          .get(`/api/accounts/${idToGet}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(specifiedAccount);
          });
      });
    });

    describe('POST /api/accounts/:userId', () => {
      it('POST /api/accounts/:userId creates a new account, responding with 201 and newly created account', () => {
        const userId = 2;
        const newAccount = {
          accounts: 'New Account',
        };

        return supertest(app)
          .post(`/api/accounts/${userId}`)
          .send(newAccount)
          .expect(201)
          .expect(res => {
              expect(res.body[0].accounts).to.eql(newAccount.accounts)
              expect(res.body[0].user_id).to.eql(userId)
              expect(res.body[0]).to.have.property('id')
          })
      });
    });
  });
});
