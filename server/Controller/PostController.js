const { json } = require("express");
const PostSchema = require("../Model/PostSchema");

const postinsert = async (req, res) => {
  console.log(req.body);

  try {
    const { CategoryId, Title, Description, Caption, Status } = req.body;
    const AuthorId = req.params.id;

    const image = req.files.map((i) => i.filename);
    const datas = await new PostSchema({
      CategoryId: CategoryId,
      AuthorId: AuthorId,
      Img: image,
      Title: Title,
      Description: Description,
      Caption: Caption,
      Status: Status,
    });

    console.log(req.files);

    const savedata = await datas.save();
    res.json({ savedata });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const postdisplay = async (req, res) => {
  try {
    const val = await PostSchema.find()
      .populate("AuthorId")
      .populate("CategoryId");
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = { postinsert, postdisplay };
