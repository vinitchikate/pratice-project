const express = require("express");
const router = express.Router();
const authorController = require("../controllers/authorController");
const { validateAuthor, validateblog } = require("../middleware/valid");
const blogController = require("../controllers/blogController");
const { Authentication, Authrization, qauth } = require("../middleware/auth");


router.post("/blogs", Authentication, validateblog, blogController.createblog);
router.delete("/blogs/:blogId", Authentication, Authrization, blogController.deleteBlogs);


router.put("/blogs/:blogId", Authrization, blogController.updateblogs);
router.delete("/blogs", Authentication, qauth, blogController.queryDeleted);


router.get("/blogs", Authentication, blogController.getBlogs);


router.post('/login', authorController.authorlogin);
router.post("/authors", validateAuthor, authorController.createauthor);

module.exports = router;



