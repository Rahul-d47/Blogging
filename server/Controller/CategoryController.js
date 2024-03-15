const { json } = require("express");
const CategorySchema = require("../Model/CategorySchema");

const categoryinsert = async (req, res) => {
  console.log(req.body);
  try {
    const { Catname } = req.body;
    let checkCategory = await CategorySchema.findOne({ Catname });
    if (checkCategory) {
      console.log("category Already exists!");
      res.json({
        message: "category Already exists!",
        Category: checkCategory,
      });
    } else {
      const datas = await new CategorySchema({
        Catname: Catname,
        Status: "active",
      });
      const savedata = await datas.save();
      res.json({ savedata });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const Catdisplay = async (req, res) => {
  try {
    const val = await CategorySchema.find();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

const Catdelete = async (req, res) => {
  try {
    let data = await CategorySchema.findById(req.params.id);
    if (!data) {
      return res.status(404).send("not found");
    }
    data = await CategorySchema.findByIdAndDelete(req.params.id);
    res.json({ data: data });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = { categoryinsert, Catdisplay, Catdelete };
