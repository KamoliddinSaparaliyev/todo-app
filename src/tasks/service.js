const { NotFoundError, ForbiddenError } = require("../error/commonErrors");
const Task = require("./model");

module.exports = {
  async create(data) {
    const task = new Task(data);
    await task.save();
    const { description, title, _id } = task._doc;
    return { description, title, id: _id };
  },

  async getAll(query) {
    const { limit = 10, page = 1, ...filters } = query;
    const skip = (page - 1) * limit;

    const data = await Task.find(filters)
      .limit(limit)
      .skip(skip)
      .select("title description id");
    const total = await Task.countDocuments(filters);

    return {
      data,
      page: +page,
      limit: +limit,
      total,
    };
  },

  async getById(id) {
    const task = await Task.findById(id).select("title description id");
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  },

  async update(id, data) {
    let task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    if (data.creator !== task.creator.toString()) {
      throw new ForbiddenError("Forbidden");
    }

    task.set(data);
    await task.save();

    const { description, title, _id } = task;

    return { description, title, id: _id };
  },

  async delete(id, creator) {
    const task = await Task.findById(id);
    if (!task) {
      throw new NotFoundError("Task not found");
    }

    if (creator !== task.creator.toString()) {
      throw new ForbiddenError("Forbidden");
    }

    await task.deleteOne();

    return { message: "Task deleted" };
  },
};
