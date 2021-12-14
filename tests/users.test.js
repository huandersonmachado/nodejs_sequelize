require('../src/app/models/index');
const { User } = require('../src/app/models');

test('should', async () => {
  const user = await User.build({
    name: 'John asdfasdf',
    email: 'teste@email.com',
    password: '123456asdfasdf',
  });
  console.log(await user.save());
  expect(true).toBe(true);
});
