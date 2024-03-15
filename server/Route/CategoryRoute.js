const express = require("express");
const {categoryinsert,Catdisplay, Catdelete} = require('../Controller/CategoryController')
const AdminToken = require("../Middleware/AdminToken")

const router = express.Router();

router.post("/insert",AdminToken, categoryinsert);
router.get("/viewAll",AdminToken, Catdisplay);
router.delete('/delete/:id',AdminToken, Catdelete)

module.exports=router;