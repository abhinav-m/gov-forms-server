const { User } = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.signup = async (req, res) => {
  debugger; //eslint-disable-line
  try {
    const { email, password } = req.body;
    const info = {
      email,
      password,
    };
    const user = new User(info);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send();
  }
};

exports.logout = async (req, res) => {
  try {
    await req.user.removeToken(req.token);
    res.status.send(200);
  } catch (e) {
    res.status(400).send(e);
  }
};
