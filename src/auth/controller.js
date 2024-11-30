const service = require("./services");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await service.login(email, password);

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const result = await service.registerUser(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
