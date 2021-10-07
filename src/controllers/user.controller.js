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

userCtrl.listid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Id number not finded.",
      });
    }
    res.json({ ok: true, message: user });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

userCtrl.update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Id number not finded.",
      });
    }

    /* Las siguientes líneas permitirá evitar errores, que los campos no queden vacíos y que tome el dato que tiene en el documento */
    const username = req.body.name || user.name;
    const lastname = req.body.name || user.lastname;
    const email = req.body.name || user.email;
    const salary = req.body.salary || user.salary;

    const userUpdate = {
      username,
      lastname,
      email,
      salary,
    };

    await user.updateOne(userUpdate);
    res.json({
      ok: true,
      message: "User update.",
    });
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
    if (!name || name.trim() === "") {
      return res.json({
        ok: false,
        message: "Name field is required, cannot be empty.",
      });
    }
    if (!lastname || lastname.trim() === "") {
      return res.json({
        ok: false,
        message: "Lstname field is required, cannot be empty.",
      });
    }
    if (!email || email.trim() === "") {
      return res.json({
        ok: false,
        message: "E-mail field is required, cannot be empty.",
      });
    }
    const verify = E - (await userModel.findOne({ email }));
    if (verify) {
      return res.status(400).json({
        ok: false,
        message: "Email address already exists relates to other user.",
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

userCtrl.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Id number not finded.",
      });
    }

    await user.deleteOne();
    res.json({
      ok: true,
      message: "User deleted.",
    });
    res.json({ ok: true, message: user });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};
module.exports = userCtrl;
