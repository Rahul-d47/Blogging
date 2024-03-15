const express = require("express");
const {postinsert ,postdisplay} = require('../Controller/PostController')
const multer = require('multer')
const AdminToken = require("../Middleware/AdminToken")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'upload/Posts')},
    filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, uniqueSuffix+'-' + file.originalname)
        }
    })

const router = express.Router();
const upload = multer({storage:storage})

router.post("/insert/:id",AdminToken, upload.array('Img'),postinsert);

router.get("/display",AdminToken, postdisplay);

module.exports=router;