module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('sites', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      site_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      logo_url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      biography: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      link_url: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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

  down: async (queryInterface) => {
    queryInterface.removeIndex('sites', 'user_id');
    queryInterface.dropTable('sites', 'user_id');
  },
};
