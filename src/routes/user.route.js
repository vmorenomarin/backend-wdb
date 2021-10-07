const { Router } = require("express");
const userCtrl = require("../controllers/user.controller");
const route = Router();

route.get("/", userCtrl.list);
route.post("/", userCtrl.add);
route.get("/userid/:id", userCtrl.listid)
route.put("/userupdate/:id", userCtrl.update)
route.delete("/userdelete/:id", userCtrl.delete)
module.exports = route;
