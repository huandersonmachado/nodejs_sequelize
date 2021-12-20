const { uuid } = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define(
    'Site',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      site_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      logo_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      biography: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  function generateUuid(site) {
    site.id = uuid();
  }

  Site.beforeCreate((site) => {
    generateUuid(site);
  });

  Site.findByUserId = async (userId) => {
    const sites = await Site.findAll({
      where: { user_id: userId },
    });

    return sites;
  };

  return Site;
};
