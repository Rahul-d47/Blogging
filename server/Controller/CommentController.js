const { json } = require("express");
const CommentSchema = require("../Model/CommentSchema");

const commentinsert = async (req, res) => {
  console.log(req.body);
  try {
    const { Comment, Status, PostId, ReaderId } = req.body;

    const datas = await new CommentSchema({
      PostId: PostId,
      ReaderId: ReaderId,
      Comment: Comment,
      Status: "Sent",
    });

    const savedata = await datas.save();
    res.json({ savedata });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const commentget = async (req, res) => {
  try {
    const val = await CommentSchema.find().populate("ReaderId");
    console.log(val);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = { commentinsert, commentget };
