const { json } = require("express");
const ReaderSchema = require("../Model/ReaderSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECERTE = "hello";

const readerinsert = async (req, res) => {
  console.log(req.body);
  try {
    const { Firstname, Lastname, Phone, Email, Password, Address, Status } =
      req.body;
    const Profile = req.files.map((i) => i.filename);
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(Password, salt);
    let checkemail = await ReaderSchema.findOne({ Email });
    if (checkemail) {
      console.log("email already exists");
      return res.status(400).json({ error: "Email already exist" });
    } else {
      const datas = await new ReaderSchema({
        Firstname: Firstname,
        Lastname: Lastname,
        Phone: Phone,
        Email: Email,
        Password: pass,
        Address: Address,
        Profile: Profile,
        Status: "True",
      });

      const savedata = await datas.save();
      res.json({ savedata });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const readerdisplay = async (req, res) => {
  try {
    const val = await ReaderSchema.find();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

const readerd1 = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await ReaderSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occurred");
  }
};

const updatereader = async (req, res) => {
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

    let data = await ReaderSchema.findById(req.params.id);
    console.log(req.params.id);
    if (!data) {
      return res.status(404).send("not found");
    }

    data = await ReaderSchema.findByIdAndUpdate(
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
    const val = await ReaderSchema.findOne({ Email: Email });

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
    let data = await ReaderSchema.findById(req.params.id);

    if (!data) {
      return res.status(404).send("Reader not found");
    }

    data = await ReaderSchema.findByIdAndUpdate(
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
    let data = await ReaderSchema.findById(req.params.id);

    if (!data) {
      return res.status(404).send("Reader not found");
    }

    data = await ReaderSchema.findByIdAndUpdate(
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
  readerinsert,
  readerdisplay,
  Login,
  readerd1,
  updatereader,
  block,
  unblock,
};
