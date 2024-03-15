const express = require("express");
const {readerinsert, readerdisplay, Login, readerd1, updatereader,unblock,block} = require('../Controller/ReaderController')
const AdminToken = require("../Middleware/AdminToken")

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'upload/Reader')},
    filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, uniqueSuffix+'-' + file.originalname)
        }
    })
const router = express.Router();

const upload = multer({storage:storage})

router.post("/insert",AdminToken, upload.array('Profile'),readerinsert);
router.post("/insert", readerinsert);

router.get("/display",AdminToken, readerdisplay);
router.get("/display1/:id",AdminToken, readerd1);
router.post("/login", Login);
router.put("/update/:id", AdminToken,updatereader)
router.put("/blockupdate/:id",AdminToken,block)
router.put("/unblock/:id",AdminToken ,unblock)

module.exports=router;