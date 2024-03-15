const express = require("express");
const ConnectToMongo = require("./Database");
const app = express();
const port = 5001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const AdminRoute = require("./Route/AdminRoute");
app.use("/api/admin", AdminRoute);

const AuthorRoute = require("./Route/AuthorRoute");
app.use("/api/author", AuthorRoute);

const CategoryRoute = require("./Route/CategoryRoute");
app.use("/api/category", CategoryRoute);

const ReaderRoute = require("./Route/ReaderRoute");
app.use("/api/reader", ReaderRoute);

const PostRoute = require("./Route/PostRoute");
app.use("/api/post", PostRoute);

const CommentRoute = require("./Route/CommentRoute");
app.use("/api/comment", CommentRoute);

const BookRoute = require("./Route/BookRoute");
app.use("/api/bookmark", BookRoute);

app.use("/api/image", express.static("./upload/Posts"));
app.use("/api/img", express.static("./upload/Reader"));
app.use("/api/img", express.static("./upload/Author"));

ConnectToMongo();
app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
