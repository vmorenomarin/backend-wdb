const { Router } = require("express");
const userCtrl = require("../controllers/user.controller");
const route = Router();

route.get("/", userCtrl.list);
route.post("/", userCtrl.add)
module.exports = route;
