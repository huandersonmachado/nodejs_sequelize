const { hashPassword, uuid } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const userSchema = sequelize.define(
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

  userSchema.beforeCreate((user) => {
    generateUuid(user);
    generateHashedPassword(user);
  });

  return userSchema;
};
