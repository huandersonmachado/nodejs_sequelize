const supertest = require('supertest');
const server = require('../../src/server');
const { User } = require('../../src/app/models');

describe('Test Users Module', () => {
  it('should register new user', async () => {
    const response = await supertest(server)
      .post('/users/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Huanderson',
        email: 'huandersonmachado@gmail.com',
        password: '123456',
      });

    console.log(response.body);

    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
  });
});
