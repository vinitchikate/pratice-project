const jwt = require('jsonwebtoken');
const blogModel = require("../models/blogModel");

const Authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-api-key"]
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" })

        }

        let checktoken = jwt.verify(token, "BloggingSiteProject")

        if (!checktoken) {
            return res.status(404).send({ status: false, msg: "Enter valid token" });

        } else {
            console.log("Token verified");
        }
        next()

    }

    catch (error) {
        return res.status(500).send({ msg: err.message })

    }
}

module.exports.Authentication = Authentication;


const Authrization = async function (req, res, next) {


    try {
        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-api-key"]
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" })

        }

        let decodedToken = jwt.verify(token, "BloggingSiteProject")
        let blogId = await req.params.blogId;

        if (blogId.length < 24) {
            return res.status(404).send({ msg: "Enter Valid blogId" });

        }

        let decoded = decodedToken.authorId
        let blog = await blogModel.findById(blogId);
        if (!blog) {
            return res.status(403).send({ msg: "BlogId dosen't exist" });

        }
        let author = blog.authorId.toString()
        console.log(author)
        if (author != decoded) {
            return res.status(404).send("Not Authorized !!")

        }
        next()

    } catch (error) {
        return res.status(500).send({ msg: err.message })

    }


}
module.exports.Authrization = Authrization;

const qauth = async function (req, res, next) {

    try {

        let token = req.headers["x-api-key"]
        if (!token) token = req.headers["X-api-key"]
        if (!token) {
            return res.status(400).send({ Error: "Enter x-api-key In Header" })

        }

        let decodedToken = jwt.verify(token, "BloggingSiteProject")
        let authorId = req.query.authorId;

        if (authorId.length < 24) {
            return res.status(404).send({ Error: "Enter valid authorId" })

        }

        let decoded = decodedToken.authorId
        let blog = await blogModel.findOne({ authorId: authorId });
        if (!blog) {
            return res.status(403).send("Blog dosen't exist");

        }
        let author = blog.authorId.toString()
        console.log(author)

        if (author != decoded) {

            return res.status(404).send("Not Authorized")

        }
        next()


    } catch (error) {
        return res.status(500).send({ msg: err.message })

    }

}

module.exports.qauth = qauth;