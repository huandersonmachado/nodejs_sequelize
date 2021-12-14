const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');

const genSalt = bcrypt.genSaltSync(10);

function hashPassword(password) {
  return bcrypt.hashSync(password, genSalt);
}

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  uuid,
  hashPassword,
  verifyPassword,
};
