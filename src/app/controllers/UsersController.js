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

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.json({
          message: 'Email and password are required',
        });
      }

      const userModel = await User.findOne({ where: { email } });

      if (!userModel) {
        return res.status(401).json({
          message: 'User not found',
        });
      }

      const data = await userModel.authorize(userModel);

      return res.status(200).json({
        message: 'User logged successfully',
        data,
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  }
}
module.exports = new UsersController();
