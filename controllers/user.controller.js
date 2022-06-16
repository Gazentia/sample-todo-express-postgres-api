const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.getUserList = async (req, res, next) => {
  try {
    const result = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const result = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await User.build({
      ...req.body,
    });
    console.log("user build: ", user);
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    const result = await user.save();
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (user) {
      user.set(req.body);
      const result = await user.save();
      return res.status(200).json(result);
    }
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.destroy();
      return res.status(204);
    }
    return res.status(204);
  } catch (err) {
    next(err);
  }
};
