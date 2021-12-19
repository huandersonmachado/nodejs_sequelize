module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('social_configs', {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      display_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      site_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'sites',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      social_config_type_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'social_configs_types',
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

  down: async (queryInterface) => queryInterface.dropTable('social_configs'),
};
