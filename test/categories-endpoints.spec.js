const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeCategoriesArray } = require('./categories.fixtures');

describe('Categories Endpoints', () => {
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
  before('clean the categories table', () => db('categories').delete());

  context('Given there are categories in the database', () => {
    const testUsers = makeUsersArray();
    const testCategories = makeCategoriesArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    beforeEach('insert categories', () => {
      return db.into('categories').insert(testCategories);
    });

    afterEach('cleanup users', () => db('users').delete());

    afterEach('cleanup categories', () => db('categories').delete());

    describe('GET /api/categories/:userId', () => {
      it('GET /api/categories/:userId responds with 200 and the categories specified by user id', () => {
        const idToGet = 2;
        const specifiedCategories = testCategories.filter(
          (category) => category.user_id === idToGet
        );
        return supertest(app)
          .get(`/api/categories/${idToGet}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(specifiedCategories);
          });
      });
    });

    describe('POST /api/categories/:userId', () => {
      it('POST /api/categories/:userId creates a new category, responding with 201 and newly created category', () => {
        const userId = 2;
        const newCategory = {
          category: 'New Category',
          type: 'expense',
        };

        return supertest(app)
          .post(`/api/categories/${userId}`)
          .send(newCategory)
          .expect(201)
          .expect((res) => {
            expect(res.body[0].category).to.eql(newCategory.category);
            expect(res.body[0].user_id).to.eql(userId);
            expect(res.body[0]).to.have.property('id');
          });
      });
    });
  });
});
