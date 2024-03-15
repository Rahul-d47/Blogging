const { json } = require("express");
const AdminSchema = require("../Model/AdminSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECERTE = "hello";

const insert = async (req, res) => {
  console.log(req.body);
  try {
    const { Name, Email, Password, Profile } = req.body;
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(Password, salt);
    const datas = await new AdminSchema({
      Name: Name,
      Email: Email,
      Password: pass,
    });

    const savedata = await datas.save();
    res.json({ savedata });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const Adminlogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const val = await AdminSchema.findOne({ Email: Email });

    if (!val) {
      res.json("Email not found");
    } else {
      const match = await bcrypt.compare(Password, val.Password);
      if (!match) {
        res.json("password does not matched");
      } else {
        const data = val.id;
        const token = await jwt.sign(data,JWT_SECERTE);
        console.log(token);
        res.json({ success: true, user: val });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = { insert, Adminlogin };
