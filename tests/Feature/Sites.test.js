const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const faker = require('faker');
const server = require('../../src/server');
const { User, Site } = require('../../src/app/models');

const jwtGenerate = (userId) =>
  jwt.sign({ id: userId }, process.env.SECRET, { expiresIn: '1d' });

const generateFakeSite = () => ({
  site_name: faker.company.companyName().replace(' ', '_'),
  logo_url: faker.image.imageUrl(),
  link_url: faker.internet.url(),
  biography: faker.lorem.paragraph(),
});

const generateFakeUser = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

describe('Test Sites Module', () => {
  it('Should get all Sites from a user logged', async () => {
    const userFake = generateFakeUser();
    const userFake2 = generateFakeUser();

    const siteFake = generateFakeSite();

    const user = await User.create(userFake);
    const site = await Site.create({ ...siteFake, user_id: user.id });

    const user2 = await User.create(userFake2);
    await Site.create({ ...siteFake, user_id: user2.id });

    const token = jwtGenerate(user.id);
    const response = await supertest(server)
      .get('/admin/sites')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBeTruthy();
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.length).toBe(1);
  });
});
