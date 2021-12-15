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

    const user = await User.findOne({
      where: { email: 'huandersonmachado@gmail.com' },
    });

    expect(user.dataValues.name).toBe('Huanderson');
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
  });
});
