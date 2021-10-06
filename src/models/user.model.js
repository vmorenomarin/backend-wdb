const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    salary: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("users", userSchema);
