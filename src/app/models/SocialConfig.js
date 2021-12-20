module.exports = (sequelize, DataTypes) => {
  const SocialConfig = sequelize.define(
    'SocialConfig',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      display_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      site_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      social_config_type_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  return SocialConfig;
};
