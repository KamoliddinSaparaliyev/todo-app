const services = require("./service");

const getAllTasks = async (req, res, next) => {
  try {
    const data = await services.getAll(req.query);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const getByIdTask = async (req, res, next) => {
  try {
    const data = await services.getById(req.params.id);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    req.body.creator = req.user.id;
    const data = await services.create(req.body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    req.body.creator = req.user.id;
    const data = await services.update(req.params.id, req.body);
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const removeTask = async (req, res, next) => {
  try {
    await services.delete(req.params.id, req.user.id);

    return res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getByIdTask,
  createTask,
  updateTask,
  removeTask,
};
