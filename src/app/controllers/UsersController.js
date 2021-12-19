const { User } = require('../models');
const UserSchema = require('../validation/UserSchema');

class UsersController {
  index() {}

  async register(req, res) {
    try {
      const { body } = req;
      const { name, email, password } = UserSchema.validateSync(body);

      const userModel = await User.create({ name, email, password });

      const data = await userModel.authorize(userModel);

      return res.status(201).json({
        message: 'User created successfully',
        data: {
          ...data,
        },
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  }
}
module.exports = new UsersController();
