const express = require("express");
const {bookinsert, bookdisplay, bookdelete} = require('../Controller/BookmarkController')
const AdminToken = require("../Middleware/AdminToken")

const router = express.Router();

router.post("/insert", bookinsert);
router.get("/display/:id", AdminToken, bookdisplay);
router.delete("/delete/:id",AdminToken, bookdelete)

module.exports=router;