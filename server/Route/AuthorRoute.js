const express = require("express");
const {authorinsert,authordisplay, Login, author1, updateauthor, block, unblock} = require('../Controller/AuthorConntroller')
const multer = require('multer')
const AdminToken = require('../Middleware/AdminToken')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'upload/Author')},
    filename: function (req, file, cb) {
            const uniqueSuffix = Date.now()
            cb(null, uniqueSuffix+'-' + file.originalname)
        }
    })

const router = express.Router();

const upload = multer({storage:storage})

router.post("/insert" ,upload.array('Profile'),authorinsert);
// router.post("/insert", AdminToken,authorinsert);

router.get("/display",AdminToken,authordisplay);
router.get("/display1/:id",AdminToken, author1);
router.post("/login", Login);
router.put("/update/:id",AdminToken,updateauthor)
router.put("/blockupdate/:id",AdminToken,block)
router.put("/unblock/:id",AdminToken,unblock)

module.exports=router;