const { json } = require("express");
const AuthorSchema = require("../Model/AuthorSchema");
const PostSchema = require("../Model/PostSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECERTE = "hello";

const authorinsert = async (req, res) => {
  console.log(req.body);
  try {
    const { Firstname, Lastname, Phone, Email, Password, Address, Status } =
      req.body;
    const Profile = req.files.map((i) => i.filename);
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(Password, salt);
   
    console.log(Email,3)
    let checkemail = await AuthorSchema.findOne({ Email });
    console.log(checkemail,22)
    if (checkemail) {
      console.log("email already exists");  
      return res.json({ error: "Email already exist" });
    } else {
      const datas = await new AuthorSchema({
        Firstname: Firstname,
        Lastname: Lastname,
        Phone: Phone,
        Email: Email,
        Password: pass,
        Address: Address,
        Profile: Profile,
        Status: "true",
      });

      const savedata = await datas.save();
      // res.json({ savedata });
      return res.json({ success: "created account" });

    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const authordisplay = async (req, res) => {
  try {
    const val = await AuthorSchema.find();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

const author1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await AuthorSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occurred");
  }
};

const updateauthor = async (req, res) => {
  const { Firstname, Lastname, Email, Phone, Address } = req.body;
  try {
    const newData = {};
    if (Firstname) {
      newData.Firstname = Firstname;
    }
    if (Lastname) {
      newData.Lastname = Lastname;
    }
    if (Email) {
      newData.Email = Email;
    }
    if (Phone) {
      newData.Phone = Phone;
    }
    if (Address) {
      newData.Address = Address;
    }

    let data = await AuthorSchema.findById(req.params.id);
    console.log(req.params.id);
    if (!data) {
      return res.status(404).send("not found");
    }

    data = await AuthorSchema.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

const Login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const val = await AuthorSchema.findOne({ Email: Email });

    if (!val) {
      res.json("Email not found");
    } else {
      const match = await bcrypt.compare(Password, val.Password);
      if (!match) {
        res.json("password does not matched");
      } else {
        const data = val.id;
        const token = await jwt.sign(data, JWT_SECERTE);
        console.log(token);
        res.json({ success: true,token: token,user:val })
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const block = async (req, res) => {
  const { Status } = req.body;
  try {
    let data = await AuthorSchema.findById(req.params.id);

    if (!data) {
      return res.status(404).send("Author not found");
    }

    data = await AuthorSchema.findByIdAndUpdate(
      req.params.id,
      { Status: "Blocked" },
      { new: true }
    );

    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const unblock = async (req, res) => {
  const { Status } = req.body;
  try {
    let data = await AuthorSchema.findById(req.params.id);

    if (!data) {
      return res.status(404).send("Author not found");
    }

    data = await AuthorSchema.findByIdAndUpdate(
      req.params.id,
      { Status: "True" },
      { new: true }
    );

    res.json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  authorinsert,
  authordisplay,
  author1,
  Login,
  updateauthor,
  block,
  unblock,
};
