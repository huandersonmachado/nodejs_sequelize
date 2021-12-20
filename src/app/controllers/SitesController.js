const { Site } = require('../models');

class SitesController {
  async index(req, res) {
    try {
      const sites = await Site.findByUserId(req.user.id);

      return res.json({
        success: true,
        data: sites,
      });
    } catch (err) {
      return res.json({
        success: false,
        erro: err,
      });
    }
  }
}

module.exports = new SitesController();
