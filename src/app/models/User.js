const jwt = require('jsonwebtoken');
const { hashPassword, uuid, verifyPassword } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password'],
        },
      },
    }
  );

  function generateUuid(user) {
    user.id = uuid();
  }

  function generateHashedPassword(user) {
    user.password = hashPassword(user.password);
  }

  User.beforeCreate((user) => {
    generateUuid(user);
    generateHashedPassword(user);
  });

  User.authenticate = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('User or password invalid');
    }

    if (verifyPassword(password, user.password)) {
      return user.authorize(user);
    }

    throw new Error('User or password invalid');
  };

  User.prototype.authorize = async (user) => {
    const secret = process.env.SECRET;

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  };

  User.associate = ({ Site }) => {
    User.hasMany(Site, { foreignKey: 'user_id', as: 'sites' });
  };

  return User;
};
