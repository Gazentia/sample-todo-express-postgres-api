const Todo = require("../models/todo.model");

exports.getTodoList = async (req, res, next) => {
  try {
    const result = await Todo.findAll();
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const result = await Todo.findByPk(req.params.id);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const todo = await Todo.build({
      ...req.body,
    });
    const result = await todo.save();
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (todo) {
      todo.set(req.body);
      const result = await todo.save();
      return res.status(200).json(result);
    }
    return res.status(204);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      todo.destroy();
      return res.status(204);
    }
    return res.status(204);
  } catch (err) {
    next(err);
  }
};
