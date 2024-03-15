const express = require("express");
const {insert, Adminlogin} = require('../Controller/AdminController')
const AdminToken = require("../Middleware/AdminToken")

const router = express.Router();

router.post("/insert",AdminToken, insert);
router.post("/login", Adminlogin);


module.exports=router;