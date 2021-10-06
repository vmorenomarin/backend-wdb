const userCtrl = {};
const userModel = require("../models/user.model");

userCtrl.list = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json({ ok: true, users });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

userCtrl.add = async (req, res) => {
  try {
    const { name, lastname, email, salary } = req.body;
    const verify = await userModel.findOne({ email });
    if (verify) {
      return res.json({
        ok: false,
        message: "Email direcctio already exists with other user.",
      });
    }
    const newUser = new userModel({
      name,
      lastname,
      email,
      salary,
    });

    await newUser.save();
    res.json({
      ok: true,
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
module.exports = userCtrl;
