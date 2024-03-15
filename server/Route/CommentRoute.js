const express = require("express");
const {commentinsert, commentget} = require('../Controller/CommentController')
const AdminToken = require("../Middleware/AdminToken")

const router = express.Router();

router.post("/insert",AdminToken,commentinsert);
router.get("/display",AdminToken, commentget);

module.exports=router;