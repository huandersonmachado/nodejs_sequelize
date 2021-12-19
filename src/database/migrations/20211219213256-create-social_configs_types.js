module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('social_configs_types', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      placeholder: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      icon: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      family_icon: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('users'),
};
