const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors/CustomError');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      throw new CustomError('Invalid credentials', 400, 'INVALID_CREDENTIALS', {date: new Date()});
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new CustomError('Invalid credentials', 400, 'INVALID_CREDENTIALS');
    }

    const token = admin.generateAuthToken();
    res.json({ token });
  } catch (error) {
    next(error instanceof CustomError ? error : new CustomError('Server error', 500));
  }
};
