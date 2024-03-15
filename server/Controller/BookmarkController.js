const { json } = require("express");
const BookmarkSchema = require("../Model/BookmarkSchema");
const { post } = require("../Route/AuthorRoute");

const bookinsert = async (req, res) => {
  console.log(req.body);
  try {
    const { PostId, ReaderId, Status } = req.body;
    let checkBookMark = await BookmarkSchema.findOne({ PostId, ReaderId });
    if (checkBookMark) {
      console.log("This post already has been bookmarked!");
      res.json({
        success: false,
        message: "This post already has been bookmarked!",
      });
    } else {
      const datas = await new BookmarkSchema({
        PostId: PostId,
        ReaderId: ReaderId,
        Status: Status,
      });
      const savedata = await datas.save();
      res.json({
        savedata: savedata,
        message: "Post saved as bookmark successfully",
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal some error occured");
  }
};

const bookdisplay = async (req, res) => {
  const ReaderId = req.params.id;
  try {
    const val = await BookmarkSchema.find({ ReaderId: ReaderId }).populate(
      "PostId"
    );
    res.json(val);

    console.log(val);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal some error occured");
  }
};

const bookdelete = async (req, res) => {
  try {
    let data = await BookmarkSchema.findById(req.params.id);
    if (!data) {
      console.log("Not found!");
      return res.status(404).send("not found");
    }
    data = await BookmarkSchema.findByIdAndDelete(req.params.id);
    console.log("Post removed from the bookmark");
    res.json({
      data: data,
      message: "Post removed from the bookmark",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal some error occured");
  }
};
module.exports = { bookinsert, bookdisplay, bookdelete };
