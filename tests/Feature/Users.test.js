const supertest = require('supertest');
const faker = require('faker');
const server = require('../../src/server');
const { User } = require('../../src/app/models');

const generateFakeUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('Test Users Module', () => {
  it('should register new user', async () => {
    const userFake = generateFakeUser();

    const response = await supertest(server)
      .post('/users/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(userFake);

    const user = await User.findOne({
      where: { email: userFake.email },
    });

    expect(user.dataValues.name).toBe(userFake.name);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('user');
  });
});
